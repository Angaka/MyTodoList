import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import Live from '../Components/Live'
import TaskDetail from '../Components/TaskDetail'

const LiveStackNavigator = createStackNavigator({
	Live: {
		screen: Live,
	},
	TaskDetail: {
		screen: TaskDetail,
	}
})

const ToDoTabNavigator = createBottomTabNavigator({
	Live: {
		screen: LiveStackNavigator,
		navigationOptions: {
			tabBarIcon: ({ focused, tintColor }) => {
				return (
					focused ?
					<Icon name='md-bookmark' size={30} color={tintColor} /> :
					<Icon name='md-bookmark' size={30} color='#15D5EE' />
				)
			}
		}
	}
}, {
	tabBarPosition: 'bottom',
	tabBarOptions: {
		activeBackgroundColor: '#15D5EE',
		inactiveBackgroundColor: '#FFFFFF',
		showLabel: true,
		showIcon: true,
		activeTintColor: '#FFFFFF',
		inactiveTintColor: '#15D5EE',
	}
})

export default ToDoTabNavigator