import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const genericNavigationOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold'
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
	headerTitle: 'A Screen'
}

const MealsNavigator = createStackNavigator({
	Categories: {
		screen: CategoriesScreen
	},
	CategoryMeals: {
		screen: CategoryMealsScreen
	},
	MealDetail: MealDetailScreen
}, {
	defaultNavigationOptions: genericNavigationOptions
});

const FavNavigator = createStackNavigator({
	Favorites: FavoritesScreen,
	MealDetail: MealDetailScreen
}, { defaultNavigationOptions: genericNavigationOptions });

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return <Ionicons name='ios-restaurant' size={20} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.primaryColor
		}
	},
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return <Ionicons name='ios-star' size={20} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.accentColor
		}
	}
};

const MealsFavTabNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(tabScreenConfig, {
			activeTintColor: 'white',
			shifting: true,
			barStyle: {
				backgroundColor: Colors.primaryColor
			}
		})
		: createBottomTabNavigator(tabScreenConfig, {
			tabBarOptions: {
				activeTintColor: Colors.accentColor
			}
		});

const FiltersNavigator = createStackNavigator(
	{
		Filters: FiltersScreen
	},
	{
		navigationOptions: {
			drawerLabel: "Filters"
		},
		defaultNavigationOptions: genericNavigationOptions
	})

const MainNavigator = createDrawerNavigator({
	MealsFavs: {screen: MealsFavTabNavigator, navigationOptions: {
		drawerLabel: 'Meals'
	}},
	Filters: FiltersNavigator
}, {
	contentOptions: {
		activeTintColor: Colors.accentColor,
		labelStyle: {
			fontFamily: 'open-sans-bold'
		}
	}
});

export default createAppContainer(MainNavigator);