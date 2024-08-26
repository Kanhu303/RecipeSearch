import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import ICONS from '../../../assets/images';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import debounce from 'lodash.debounce';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SPOONACULAR_API_KEY} from '../../constants';
import styles from './style';

// Define the type for navigation prop
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RecipeDetail'
>;

// Define the type for a recipe
interface Recipe {
  title: string;
  image: string;
  id: string;
}

const ChatBot: React.FC = () => {
  const [query, setQuery] = useState<string>(''); // Holds the user's search query
  const [loading, setLoading] = useState<boolean>(false); // Loading state for API calls
  const [results, setResults] = useState<Recipe[]>([]); // Stores the search results
  const [error, setError] = useState<string | null>(null); // Error message state
  const [page, setPage] = useState<number>(1); // Pagination: current page
  const [hasMore, setHasMore] = useState<boolean>(true); // Check if more results are available

  const recognitionTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for handling recognition timeout

  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    loadSearchResult(); // Load the latest search result from Async Storage on mount
    return () => {
      Voice.destroy().then(Voice.removeAllListeners); // Clean up listeners on unmount
    };
  }, []);

  // Load the latest search result from Async Storage
  const loadSearchResult = async () => {
    try {
      const savedResult = await AsyncStorage.getItem('latestSearchResult');
      if (savedResult !== null) {
        setResults(JSON.parse(savedResult));
      }
    } catch (error) {
      console.error('Error loading data from Async Storage:', error);
    }
  };

  // Save the latest search result to Async Storage
  const saveSearchResult = async (data: Recipe[]) => {
    try {
      await AsyncStorage.setItem('latestSearchResult', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to Async Storage:', error);
    }
  };

  // Handle the results from voice recognition
  const onSpeechResults = (e: any) => {
    clearTimeout(recognitionTimeoutRef.current!); // Clear the timeout if speech is recognized
    const spokenText = e.value[0];
    setQuery(spokenText);
    debouncedSearch(spokenText);
  };

  // Handle errors from voice recognition
  const onSpeechError = (e: any) => {
    console.log(e, '////////////');
    setError(e.error.message);
    setLoading(false);
  };

  // Start voice recognition
  const startRecognition = async () => {
    setError(null);
    setResults([]);
    setLoading(true);
    setQuery(''); // Clear the text field when starting new recognition
    try {
      await Voice.start('en-US');
      // Start the timeout to check for inactivity
      recognitionTimeoutRef.current = setTimeout(() => {
        stopRecognition();
        setError('Did not recognize any voice. Please try again.');
        startRecognition(); // Restart the recognition if no voice is recognized
      }, 5000); // 5 seconds timeout
    } catch (e) {
      console.error(e);
      setError('Failed to start voice recognition.');
      setLoading(false);
    }
  };

  // Stop voice recognition
  const stopRecognition = async () => {
    try {
      clearTimeout(recognitionTimeoutRef.current!); // Clear the timeout when stopping
      await Voice.stop();
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch search results from the Spoonacular API
  const searchApi = async (searchQuery: string) => {
    if (!searchQuery) return;
    setLoading(true);
    try {
      const response = await axios.get<{results: Recipe[]}>(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&addRecipeInstructions=true&apiKey=${SPOONACULAR_API_KEY}`,
      );
      setResults(response.data.results);
      saveSearchResult(response.data.results); // Save the results to Async Storage
      stopRecognition(); // Stop voice recognition after fetching results
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response && e.response.status === 402) {
          setError('Payment is required to access this service.');
        } else {
          setError('An error occurred while searching.');
        }
      } else {
        console.error(e);
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounce the search input to limit API calls
  const debouncedSearch = useCallback(
    debounce(text => searchApi(text), 500),
    [],
  );

  // Handle text input changes and initiate search
  const handleTextChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  // Navigate to the recipe detail screen
  const onPressCard = (id: string) => {
    navigation.navigate('RecipeDetail', {recipeId: id});
  };

  // Render each recipe item in the FlatList
  const recipiesRenderItem = ({item}: {item: Recipe}) => (
    <Pressable style={styles.card} onPress={() => onPressCard(item.id)}>
      <Image
        source={{uri: item.image}}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type or speak your search query"
          value={query}
          onChangeText={handleTextChange}
          editable={!loading} // Disable input while loading
          placeholderTextColor={'#000'}
        />
        <TouchableOpacity
          onPress={startRecognition}
          style={[
            styles.microphoneButton,
            loading && {backgroundColor: '#ccc'}, // Change color while loading
          ]}
          disabled={loading} // Disable button while loading
        >
          <Image source={ICONS.MIC} style={styles.micIcon} />
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="tomato" />}

      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={recipiesRenderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        !loading && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Please Search for recipes.</Text>
          </View>
        )
      )}
    </View>
  );
};

export default ChatBot;
