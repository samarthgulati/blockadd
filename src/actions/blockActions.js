export const createBlock = (payload) => dispatch => {
	dispatch({
		type: 'CREATE_BLOCK',
		payload
	})
}

export const toggleEdit = (payload) => dispatch => {
	dispatch({
		type: 'TOGGLE_EDIT',
		payload
	})
}

export const resizeBlock = (payload) => dispatch => {
	dispatch({
		type: 'RESIZE_BLOCK',
		payload
	})
}
