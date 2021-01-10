// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import * as Font from 'expo-font';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MealsNavigator from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';


enableScreens();

const rootReducer = combineReducers({
	meals: mealsReducer
});

const store = createStore(rootReducer);

const fetchFonts = _ => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return <AppLoading
			startAsync={fetchFonts}
			onFinish={_ => setFontLoaded(true)}
			onError={console.warn} />
	}

	return (
		<Provider store={store}>
			<MealsNavigator />
		</Provider>
	);
};