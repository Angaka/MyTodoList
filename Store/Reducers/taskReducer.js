const initialState = { tasks: [] }

function toggleTask(state = initialState, action) {
	let nextState
	const taskIndex = state.tasks.findIndex(item => item.id === action.value.id)

	switch (action.type) {
		case 'ADD_TASK':
			nextState = {
				...state,
				tasks: [...state.tasks, action.value]
			}
			return nextState || state
		case 'REMOVE_TASK':
			if (taskIndex !== -1) {
				nextState = {
					...state,
					tasks: state.tasks.filter((item, index) => index !== taskIndex)
				}
			}
			return nextState || state
		case 'UPDATE_TASK':
			if (taskIndex !== -1) {
				nextState = {
					...state,
					tasks: state.tasks.map((item) => item.id === action.value.id ? {...item, ...action.value} : item )
				}
			}
			return nextState || state
		default:
			return state
	}
}

export default toggleTask