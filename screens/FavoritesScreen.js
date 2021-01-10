import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';

const hardMealList = ['m1', 'm2'];

const FavoritesScreen = props => {
	const availableMeals = useSelector(state => state.meals.favoriteMeals); 
	
	return <MealList listData={availableMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Favorites',
		headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
			<Item
				title="Menu"
				iconName="ios-menu"
				onPress={_ => navData.navigation.toggleDrawer()} />
		</HeaderButtons>
	}
};

export default FavoritesScreen;