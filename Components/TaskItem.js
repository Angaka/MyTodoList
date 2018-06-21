import React from 'react'

import { StyleSheet, View, Text, Button, TouchableOpacity, Animated, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import Color from '../Helpers/Color'

class TaskItem extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	positionLeft: new Animated.Value(Dimensions.get('window').width)
	  };
	}

	componentDidMount() {
		Animated.spring(this.state.positionLeft, { toValue: 0 }).start()
	}

	render() {
		const { task, displayDetailForTask, sendTaskTo, deleteTask } = this.props
		return (
			<Animated.View style={{ left: this.state.positionLeft }}>
				<TouchableOpacity style={styles.main_container} onPress={() => displayDetailForTask(task.id)}>
					<TouchableOpacity onPress={() => sendTaskTo(task) }>
		          		<Icon
		          			name={task.isDone ? 'ios-checkmark-circle-outline' : 'ios-radio-button-off' }
		          			size={45}
		          			color={Color.textColor} />
	      			</TouchableOpacity>
					<View style={styles.text_container}>
						<Text style={styles.title_text}>{task.title}</Text>
						<Text style={styles.description_text}>{task.description}</Text>
					</View>
					<TouchableOpacity onPress={() => deleteTask(task) }>
		          		<Icon
		          			name='ios-close'
		          			size={40}
		          			color={Color.textColor} />
	      			</TouchableOpacity>
				</TouchableOpacity>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flexDirection: 'row',
		backgroundColor: Color.backgroundColor,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		alignItems: 'center',
	},
	text_container: {
		marginLeft: 20,
		flex: 1,
	},
	title_text: {
		color: Color.textColor,
		fontSize: 22,
	},
	description_text: {
		color: Color.subTextColor,
		fontSize: 18,
	},
})

export default TaskItem