import React from 'react'
import { StyleSheet, FlatList } from 'react-native'

import TaskItem from './TaskItem'

class TaskList extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this._displayDetailForTask = this._displayDetailForTask.bind(this)
	}

	_displayDetailForTask(taskId) {
		this.props.navigation.navigate('FilmDetail', { taskId: taskId })
	}

	render() {
		return (
			<FlatList
				style={styles.list_container}
				data={this.props.tasks}
				keyExtractor={(item) => item.id.toString()}
				renderItem={(item) => <TaskItem task={item} />}
				onEndReachedThreshold={0.5}
				onEndReached={() => {
					console.log('onEndReached');
				}}
			/>
		)
	}
}

const styles = StyleSheet.create({
	list_container: {
		flex: 1
	}
})

export default TaskList