import React from 'react'
import { connect } from 'react-redux'

import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../Helpers/Color'

import TaskList from './TaskList'


class Live extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	_displayFloatingAddButton() {
		if (Platform.OS === 'android') {
			return (
				<TouchableOpacity
	          		style={styles.touchable_floatingactionbutton}
	          		onPress={() => this._displayAddTaskPopup()}>
	          		<Icon
	          			name='md-add'
	          			size={30}
	          			color={Color.backgroundColor} />
		        </TouchableOpacity>
	        )
		}
	}

	_sendTaskTo() {
		
	}

	_displayAddTaskPopup() {
		this.props.navigation.navigate('TaskDetail', { isNewTask: true })
	}

	render() {
		return (
			<View style={styles.main_container}>
				<TaskList
					tasks={this.props.tasks}
					navigation={this.props.navigation}
					taskDone={false}				
				/>
				{this._displayFloatingAddButton()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		backgroundColor: Color.backgroundColor,
	},
	touchable_floatingactionbutton: {
		position: 'absolute',
		bottom: 30,
		right: 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
		backgroundColor: Color.activeColor,
		height: 60,
		width: 60,
	},
})

const mapStateToProps = state => {
	return {
		tasks: state.tasks
	}
}

export default connect(mapStateToProps)(Live)