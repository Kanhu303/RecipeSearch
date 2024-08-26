import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: Platform.OS === 'ios' ? 60 : 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
  },
  microphoneButton: {
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  micIcon: {
    height: 20,
    width: 20,
    tintColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
  card: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#CCE0AC',
    borderRadius: 10,
    shadowOffset: {height: 3, width: 0},
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    margin: 10,
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'gray',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default styles;
