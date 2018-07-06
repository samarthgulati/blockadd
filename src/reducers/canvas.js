import initialState from '../initialState'

export default (state = initialState.canvas, action) => {
	switch (action.type) {
		case 'CREATE_BLOCK': {
			const yCoord = Math.floor(action.payload.y / window.delta)
			const occupied = state.blocks.find(b => b.yCoord === yCoord)
			if(occupied !== undefined) return state
			const y = yCoord * window.delta
			const xCoord = Math.floor(action.payload.x / window.delta)
			const x = xCoord * window.delta
			const x2Coord = xCoord + 1
			const x2 = x2Coord * window.delta
			const fill = `hsl(${Math.floor(Math.random() * 12) * 30}, 100%, 50%)` // hue = 360 / 12
			const width = window.delta
			const height = window.delta
			const block  = {xCoord, x, x2Coord, x2, yCoord, y, width, height, fill}
			return {
				editIndex: state.blocks.length,
				blocks: [...state.blocks, block]
			}
		}
		case 'TOGGLE_EDIT':
			return {
				...state, 
				editIndex: state.editIndex !== null ? null : action.payload.idx
			}
		case 'RESIZE_BLOCK': {
			return {
				...state, blocks: state.blocks.map((block, i) => {
					if(i !== state.editIndex) {
						return block
					}
					const xDist = Math.abs(action.payload.x - block.x)
					const x2Dist = Math.abs(action.payload.x - block.x2)
					if(xDist > x2Dist) {
						const x2Coord = Math.ceil(action.payload.x / window.delta)
						const x2 = x2Coord * window.delta
						const width = x2 - block.x
						return {...block, x2Coord, x2, width}
					} else {
						const xCoord = Math.floor(action.payload.x / window.delta)
						const x = xCoord * window.delta
						const width = block.x2 - x
						return {...block, xCoord, x, width}
					}
				})
			}
		}
		default:
			return state
	}
}
