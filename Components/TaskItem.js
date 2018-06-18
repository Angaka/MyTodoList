import React from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import Color from '../Helpers/Color'

class TaskItem extends React.Component {
	render() {
		const { task, displayDetailForTask, sendTaskTo } = this.props
		return (
			<TouchableOpacity style={styles.main_container} onPress={() => displayDetailForTask(task.id)}>
				<TouchableOpacity onPress={() => sendTaskTo() }>
	          		<Icon
	          			name='ios-radio-button-off'
	          			size={60}
	          			color={Color.textColor} />
      			</TouchableOpacity>
				<View style={styles.text_container}>
					<Text style={styles.title_text}>{task.title}</Text>
					<Text style={styles.description_text}>{task.description}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flexDirection: 'row',
		backgroundColor: Color.backgroundColor,
		alignItems: 'center',
		padding: 15,
	},
	text_container: {
		marginLeft: 15,
	},
	title_text: {
		color: Color.textColor,
		fontSize: 22
	},
	description_text: {
		color: Color.subTextColor,
		fontSize: 20
	},
})

export default TaskItem