import React from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: '1', name: 'Pizza', image: require('./assets/pizza.png') },
  { id: '2', name: 'Burgers', image: require('./assets/burger.png') },
  { id: '3', name: 'Steak', image: require('./assets/steak.png') },
];

const popularItems = [
  { id: '1', name: 'Food 1', price: '$1', image: require('./assets/food1.png') },
  { id: '2', name: 'Food 2', price: '$3', image: require('./assets/food2.png') },
];

const saleOffItems = [
  { id: '3', name: 'Food 3', price: '$2', discount: '10% OFF', image: require('./assets/food3.png') },
  { id: '4', name: 'Food 4', price: '$4', discount: '15% OFF', image: require('./assets/food4.png') },
];

const Header = () => (
  <View style={styles.header}>
    <Ionicons name="location-outline" size={20} color="black" />
    <TextInput placeholder="Search for meals or area" style={styles.searchBar} />
    <Ionicons name="search" size={20} color="black" />
  </View>
);

const CategoryItem = ({ item }) => (
  <View style={styles.categoryItem}>
    <Image source={item.image} style={styles.categoryImage} />
    <Text>{item.name}</Text>
  </View>
);

const FoodItem = ({ item }) => (
  <View style={styles.foodItem}>
    <Image source={item.image} style={styles.foodImage} />
    {item.discount && <Text style={styles.discountBadge}>{item.discount}</Text>}
    <Text>{item.name}</Text>
    <Text>{item.price}</Text>
  </View>
);

const HomeScreen = () => (
  <View style={styles.container}>
    <Header />
    <Text style={styles.sectionTitle}>Top Categories</Text>
    <FlatList data={categories} horizontal renderItem={({ item }) => <CategoryItem item={item} />} />
    
    <View style={styles.row}>
      <Text style={styles.sectionTitle}>Popular Items</Text>
      <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
    </View>
    <FlatList data={popularItems} numColumns={2} renderItem={({ item }) => <FoodItem item={item} />} />
    
    <View style={styles.row}>
      <Text style={styles.sectionTitle}>Sale-off Items</Text>
      <TouchableOpacity><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
    </View>
    <FlatList data={saleOffItems} numColumns={2} renderItem={({ item }) => <FoodItem item={item} />} />
  </View>
);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'orange' }}>
        <Tab.Screen name="Explorer" component={HomeScreen} options={{
          tabBarIcon: ({ color }) => <Ionicons name="fast-food-outline" size={20} color={color} />
        }} />
        <Tab.Screen name="Account" component={() => <View><Text>Account</Text></View>} options={{
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={20} color={color} />
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', borderRadius: 10, padding: 10, marginVertical: 10 },
  searchBar: { flex: 1, marginHorizontal: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewAll: { color: 'orange' },
  categoryItem: { alignItems: 'center', marginRight: 15 },
  categoryImage: { width: 60, height: 60, borderRadius: 10 },
  foodItem: { flex: 1, padding: 10, margin: 5, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 },
  foodImage: { width: '100%', height: 100, borderRadius: 10 },
  discountBadge: { position: 'absolute', top: 5, left: 5, backgroundColor: 'red', color: 'white', padding: 5, borderRadius: 5, fontSize: 12 }
});
