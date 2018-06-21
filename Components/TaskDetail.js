import React from 'react'
import { 
	StyleSheet, 
	View, 
	Text, 
	Keyboard, 
	KeyboardAvoidingView, 
	TextInput, 
	ActivityIndicator,
	TouchableOpacity,
	Platform
} from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import uniqueId from 'lodash.uniqueid'
import Color from '../Helpers/Color'

class TaskDetail extends React.Component {

	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state

		if (Platform.OS === 'ios') {
			return {
				title: params.title,
				headerRight: <TouchableOpacity
								onPress={() => params.addOrUpdateTask()}>
				          		<Icon
				          			name='ios-checkmark-outline'
				          			size={45}
				          			color={Color.textColor} />
							</TouchableOpacity>
			}
		} else {
			return {
				title: params.title
			}
		}
	}

	constructor(props) {
	  	super(props);
	  	this.state = {
	  		task: {
		  		id: uniqueId(),
				isDone: false,
				title: '',
				description: '',
  			},
	  		isLoading: true,
	  		showRequiredField: false,
	  	};

	  	this._addOrUpdateTask = this._addOrUpdateTask.bind(this)
	}

	componentDidMount() {
		if (!this.props.navigation.state.params.isNewTask) {
			const taskId = this.props.navigation.state.params.taskId
			const taskIndex = this.props.tasks.findIndex((item) => item.id === taskId)
			if (taskIndex !== -1) {
				this.setState({	task: this.props.tasks[taskIndex] })
			}
		}
		this.setState({ isLoading: false })
		this.props.navigation.setParams({
			title: this.props.navigation.state.params.isNewTask ? 'Add a new task' : 'Update this task',
			addOrUpdateTask: this._addOrUpdateTask
		})
	}

	_displayFloatingAddButton() {
		if (Platform.OS === 'android') {
			return (
				<TouchableOpacity
	          		style={styles.touchable_floatingactionbutton}
	          		onPress={() => this._addOrUpdateTask()}>
	          		<Text style={styles.confirm_text}>{this.props.navigation.state.params.isNewTask ? 'Add this task' : 'Update this task'}</Text>
		        </TouchableOpacity>
	        )
		}
	}

	_addOrUpdateTask() {
		if (this.state.task.title.trim()) {
			const action = { type: 'TOGGLE_TASK', value: this.state.task }
			this.props.dispatch(action)

			this.props.navigation.goBack()
		} else {
			this.setState({
				showRequiredField: true
			})
		}
	}

	_displayTask() {
		return (
			<View>
				<FormLabel>Title</FormLabel>
				<FormInput onChangeText={(text) => this.setState({ task: {
						...this.state.task,
						title: text
					}})}>{this.state.task.title}</FormInput>
				{ this.state.showRequiredField ? <FormValidationMessage>Title is required</FormValidationMessage> : null }
				<FormLabel>Description</FormLabel>
				<FormInput onChangeText={(text) => this.setState({ task: {
						...this.state.task,
						description: text
					}})}>{this.state.task.description}</FormInput>
			</View>
		)
	}

	_displayLoading() {
		if (this.state.isLoading) {
			return (
  				<View style={styles.loading_container}>
  					<ActivityIndicator size='large'/>
  				</View>
			)
		}
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.main_container} behavior="padding" enabled>	
				{this._displayTask()}
				{this._displayLoading()}
				{this._displayFloatingAddButton()}
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	main_container: {
		flex: 1,
		backgroundColor: Color.backgroundColor,
		padding: 20,
	},
	loading_container: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	title_text: {
		maxHeight: 140,
		color: Color.textColor,
		fontSize: 30,
		marginTop: 20,
	},
	description_text: {
		maxHeight: 100,
		color: Color.subTextColor,
		fontSize: 20,
		marginTop: 20,
		marginBottom: 20,
	},
	touchable_floatingactionbutton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
		marginTop: 20,
		height: 50,
		backgroundColor: Color.activeColor,
	},
	confirm_text: {
		color: 'white',
		fontSize: 20,
	}
})

const mapStateToProps = state => {
	return {
		tasks: state.tasks
	}
}

export default connect(mapStateToProps)(TaskDetail)