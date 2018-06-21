const initialState = { tasks: [] }

function toggleTask(state = initialState, action) {
	let nextState
	const taskIndex = state.tasks.findIndex(item => item.id === action.value.id)

	switch (action.type) {
		case 'TOGGLE_TASK':
			if (taskIndex !== -1) {
				nextState = {
					...state,
					tasks: state.tasks.map((item) => item.id === action.value.id ? {...item, ...action.value} : item )
				}
			} else {
				nextState = {
					...state,
					tasks: [...state.tasks, action.value]
				}
			}
			return nextState || state
		case 'SEND_TASK':
			if (taskIndex !== -1) {
				nextState = {
					...state,
					tasks: state.tasks.map((item) => item.id === action.value.id ? {...item, isDone: !item.isDone} : item )
				}
			}
			return nextState || state
		case 'DELETE_TASK':
			if (taskIndex !== -1) {
				nextState = {
					...state,
					tasks: state.tasks.filter((item, index) => index !== taskIndex)
				}
			}
			return nextState || state
		default:
			return state
	}
}

export default toggleTask