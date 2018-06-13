import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import TaskList from './TaskList'

class Live extends React.Component {
	render() {
		return (
			<View style={styles.main_container}>
				<Text>Live</Text>
				<TaskList
					tasks={this.props.tasks}
					navigation={this.props.navigation}					
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1
	}
})

export default Live