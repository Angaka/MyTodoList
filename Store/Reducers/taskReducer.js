const initialState = { tasks: [] }

function toggleTask(state = initialState, action) {
	let nextState

	switch (action.type) {
		case 'ADD_TASK':
			nextState = {
				...state,
				tasks: [...state.tasks, action.value]
			}
			return nextState || state
		case 'REMOVE_TASK':
			const taskIndex = state.tasks.findIndex(item => item.id === action.value.id)
			if (taskIndex !== -1) {
				nextState = {
					...state,
					tasks: state.tasks.filter((item, index) => index !== taskIndex)
				}
			}
			return nextState || state
		// case 'UPDATE_TASK':
		// 	const taskIndex = state.tasks.findIndex(item => item.id === action.value.id)
		// 	if (taskIndex !== -1) {
		// 		const taskToUpdate = state.tasks[taskIndex]
		// 		const taskUpdated = {
		// 			...taskToUpdate,
		// 			...action.value
		// 		}
		// 		return {
		// 			...state
		// 		}
		// 		nextState = {
		// 			...state,
		// 			tasks: [...state.tasks, action.value]
		// 		}
		// 	}
		// 	return state
		default:
			return state
	}
}

export default toggleTask