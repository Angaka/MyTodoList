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

import Icon from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'

import uuidv1 from 'uuid/v1'

import Color from '../Helpers/Color'

class TaskDetail extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('otherParams', 'Add a new task')
		}
	}

	constructor(props) {
	  	super(props);
	
	  	const uuidOptions = {
	  		msecs: new Date().getTime()
	  	}
	  	this.state = {
	  		task: {
		  		id: uuidv1(uuidOptions),
				status: this.props.navigation.state.params.isNewTask ? 'NEW' : 'UPDATED'
  			},
	  		isLoading: true,
	  	};
	}

	componentDidMount() {
		if (!this.props.navigation.state.params.isNewTask) {
			const taskId = this.props.navigation.state.params.taskId
			const taskIndex = this.props.tasks.findIndex((item) => item.id === taskId)
			if (taskIndex !== 1) {
				this.setState({	task: this.props.tasks[taskIndex] })
			}
		}
		this.setState({ isLoading: false })
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
		// console.log('task : ', this.state.task);
		const action = { type: this.props.navigation.state.params.isNewTask ? 'ADD_TASK' : 'UPDATE_TASK', value: this.state.task }
		this.props.dispatch(action)
	}

	_displayTask() {
		if (!this.props.navigation.state.params.isNewTask) {
			return (
				<View>
					<TextInput 
						style={styles.title_text}
						value={this.state.task.title}
						placeholder='Enter a title here' 
						underlineColorAndroid='rgba(0,0,0,0)'
						multiline={true}
						maxLength={80}
						blurOnSubmit = {true}
						onChangeText={(text) => this.setState({ task: {
							...this.state.task,
							title: text
						}})}/>
					<TextInput 
						style={styles.description_text}
						value={this.state.task.description}
						placeholder='Enter a description here' 
						underlineColorAndroid='rgba(0,0,0,0)'
						multiline={true}
						maxLength={140}
						blurOnSubmit = {true}
						onChangeText={(text) => this.setState({ task: {
							...this.state.task,
							description: text
						}})}/>
				</View>
			)
		} else {
			return (
				<View>
					<TextInput 
						style={styles.title_text} 
						placeholder='Enter a title here' 
						underlineColorAndroid='rgba(0,0,0,0)'
						multiline={true}
						maxLength={80}
						blurOnSubmit = {true}
						onChangeText={(text) => this.setState({ task: {
							...this.state.task,
							title: text
						}})}/>
					<TextInput 
						style={styles.description_text}
						placeholder='Enter a description here' 
						underlineColorAndroid='rgba(0,0,0,0)'
						multiline={true}
						maxLength={140}
						blurOnSubmit = {true}
						onChangeText={(text) => this.setState({ task: {
							...this.state.task,
							description: text
						}})}/>
				</View>
			)			
		}
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