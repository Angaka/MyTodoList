import React from 'react'
import { 
	StyleSheet, 
	View, 
	Text, 
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native'

import { connect } from 'react-redux'

import Color from '../Helpers/Color'

import TaskList from './TaskList'

class Done extends React.Component {
	render() {
		return (
			<View style={styles.main_container}>
				<TaskList
					tasks={this.props.tasks}
					navigation={this.props.navigation}
					isDone={true} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		backgroundColor: Color.backgroundColor,
	},
})

const mapStateToProps = state => {
	return {
		tasks: state.tasks.map((item) => item.isDone === true)
	}
}

export default connect(mapStateToProps)(Done)