import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {SPOONACULAR_API_KEY} from '../../constants';

type RecipeDetailRouteProp = RouteProp<RootStackParamList, 'RecipeDetail'>;

type Props = {
  route: RecipeDetailRouteProp;
};

const RecipeDetail: FC<Props> = ({route}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    getRecipeDetail();
  }, [route.params.recipeId]);

  // Function to fetch recipe details from the API
  const getRecipeDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${route.params.recipeId}/analyzedInstructions?apiKey=${SPOONACULAR_API_KEY}`,
      );
      setResults(response.data[0]?.steps || []);
    } catch (e) {
      console.error(e);
      setError('An error occurred while fetching the recipe details.');
    } finally {
      setLoading(false);
    }
  };

  // Render function for each step in the recipe
  const stepsRenderItem = ({item}) => (
    <View style={styles.stepContainer}>
      <Text
        style={[styles.title, {marginTop: 0}]}>{`Step ${item.number}`}</Text>
      <Text style={styles.stepText}>{item.step}</Text>
      <Text style={styles.ingredientsTitle}>Ingredients</Text>
      {item?.ingredients.length > 0 ? (
        <View style={styles.ingredientsContainer}>
          {item?.ingredients.map((ingredient: any) => (
            <View key={ingredient?.id} style={styles.ingredientItem}>
              <Image
                source={{
                  uri: ingredient?.image.includes('https')
                    ? ingredient?.image
                    : `https://spoonacular.com/cdn/ingredients/_100x100/${ingredient?.image}`,
                }}
                style={styles.ingredientImage}
              />
              <Text style={styles.ingredientText}>{ingredient.name}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={[styles.ingredientText, {marginTop: 5}]}>
          No ingredients required for this step.
        </Text>
      )}
      <Text style={styles.ingredientsTitle}>Equipment</Text>
      {item?.equipment.length > 0 ? (
        <View style={styles.ingredientsContainer}>
          {item?.equipment.map((equipment: any) => (
            <View key={equipment?.id} style={styles.ingredientItem}>
              <Image
                source={{
                  uri: equipment?.image.includes('https')
                    ? equipment?.image
                    : `https://spoonacular.com/cdn/ingredients/_100x100/${equipment?.image}`,
                }}
                style={styles.ingredientImage}
              />
              <Text style={styles.ingredientText}>{equipment?.name}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={[styles.ingredientText, {marginTop: 5}]}>
          No equipment required for this step.
        </Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Go Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Recipe Detail</Text>
      </View>

      <FlatList
        data={results}
        renderItem={stepsRenderItem}
        keyExtractor={item => item.number.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 20,
  },
  goBackButton: {
    padding: 10,
    zIndex: 1,
  },
  goBackText: {
    fontSize: 16,
    color: '#007BFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  stepContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {height: 5, width: 0},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  stepText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '400',
  },
  ingredientsTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  ingredientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  ingredientText: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 16,
    marginTop: 20,
  },
});

export default RecipeDetail;
