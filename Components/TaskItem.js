import React from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native'

class TaskItem extends React.Component {
	render() {
		const { task } = this.props
		return (
			<TouchableOpacity style={styles.main_container}>
				<Text style={styles.title_text}>{task.title}</Text>
				<Text style={styles.default_text}>{task.hashTags.map((hashtag) => {
					return hashtag
				}).join(' ')}
				</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		height: 100,
		flexDirection: 'row'
	},
	title_text: {
		color: '#9296A0'
	},
	default_text: {
		color: '#B5B6C1'
	},
})

export default TaskItem