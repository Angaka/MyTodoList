import React from 'react'
import { connect } from 'react-redux'

import { 
	StyleSheet, 
	View, 
	Text, 
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native'

import Toast from 'react-native-easy-toast'

import Color from '../Helpers/Color'

import TaskList from './TaskList'

class Done extends React.Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	tasks: [],
	  };
  	  this._sendTaskTo = this._sendTaskTo.bind(this)
	  this._deleteTask = this._deleteTask.bind(this)
	}

	_sendTaskTo(task) {
		this.refs.toast.show('Task moved to live', 500, () => {
			const action = { type: 'SEND_TASK', value: task }
			this.props.dispatch(action)			
		})
	}

	_deleteTask(task) {
		const action = { type: 'DELETE_TASK', value: task }
		this.props.dispatch(action)
	}

	render() {
		return (
			<View style={styles.main_container}>
				<TaskList
					tasks={this.props.tasks}
					navigation={this.props.navigation}
					sendTaskTo={this._sendTaskTo}
					deleteTask={this._deleteTask} />
				<Toast ref='toast'/>
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
		tasks: state.tasks.filter((item) => item.isDone)
	}
}

export default connect(mapStateToProps)(Done)