import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import Live from '../Components/Live'
import Done from '../Components/Done'
import TaskDetail from '../Components/TaskDetail'

import Color from '../Helpers/Color'

const LiveStackNavigator = createStackNavigator({
	Live: {
		screen: Live,
	},
	TaskDetail: {
		screen: TaskDetail,
	}
})

const DoneStackNavigator = createStackNavigator({
	Done: {
		screen: Done,
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
					<Icon name='md-bookmark' size={30} color={Color.activeColor} /> :
					<Icon name='md-bookmark' size={30} color={tintColor} />
				)
			}
		}
	},
	Done: {
		screen: DoneStackNavigator,
		navigationOptions: {
			tabBarIcon: ({ focused, tintColor }) => {
				return (
					focused ?
					<Icon name='md-archive' size={30} color={Color.activeColor} /> :
					<Icon name='md-archive' size={30} color={tintColor} />
				)
			}
		}
	}
}, {
	tabBarPosition: 'bottom',
	tabBarOptions: {
		activeBackgroundColor: Color.backgroundColor,
		inactiveBackgroundColor: Color.backgroundColor,
		showLabel: true,
		showIcon: true,
		activeTintColor: Color.activeColor,
		inactiveTintColor: Color.inactiveColor,
	}
})

export default ToDoTabNavigator