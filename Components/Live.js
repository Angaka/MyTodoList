import React from 'react'
import { connect } from 'react-redux'

import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-easy-toast'
import Color from '../Helpers/Color'

import TaskList from './TaskList'

class Live extends React.Component {

	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state

		if (Platform.OS === 'ios') {
			return {
				headerRight: <TouchableOpacity
								onPress={() => params.displayTaskDetail()}>
				          		<Icon
				          			name='ios-checkmark-outline'
				          			size={45}
				          			color={Color.textColor} />
							</TouchableOpacity>
			}
		}
	}

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	tasks: [],
	  };
	  this._displayTaskDetail = this._displayTaskDetail.bind(this)
  	  this._sendTaskTo = this._sendTaskTo.bind(this)
	  this._deleteTask = this._deleteTask.bind(this)
	}

	componentDidMount() {
		this.props.navigation.setParams({
			displayTaskDetail: this._displayTaskDetail,
		})
	}

	_displayFloatingAddButton() {
		if (Platform.OS === 'android') {
			return (
				<TouchableOpacity
	          		style={styles.touchable_floatingactionbutton}
	          		onPress={() => this._displayTaskDetail()}>
	          		<Icon
	          			name='md-add'
	          			size={30}
	          			color={Color.backgroundColor} />
		        </TouchableOpacity>
	        )
		}
	}

	_displayTaskDetail() {
		this.props.navigation.navigate('TaskDetail', { isNewTask: true })
	}

	_sendTaskTo(task) {
		this.refs.toast.show('Task moved to done', 500, () => {
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
					deleteTask={this._deleteTask}/>
				{this._displayFloatingAddButton()}
				<Toast ref='toast' />
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
		tasks: state.tasks.filter((item) => !item.isDone)
	}
}

export default connect(mapStateToProps)(Live)