import initialState from '../initialState'
const findGroupIdx = (groups, block) => {
	return groups.findIndex(group => 
		(block.y > group.y) && (block.y <= group.y + group.height) &&
		((block.x < group.x2) || (block.x2 > group.x)) &&
		group.type === '+'
	)
}
const newGroup = (group, blocks) => {
	const newGroupObj = blocks.reduce((newGroupObj, block, i)=>{
		if(i === 0) {
			const {xCoord, x, x2Coord, x2, yCoord, y} = block
			return {xCoord, x, x2Coord, x2, yCoord, y}
		}
		newGroupObj.xCoord = Math.min(newGroupObj.xCoord, block.xCoord)
		newGroupObj.x = Math.min(newGroupObj.x, block.x)
		newGroupObj.x2Coord = Math.max(newGroupObj.x2Coord, block.x2Coord)
		newGroupObj.x2 = Math.max(newGroupObj.x2, block.x2)
		newGroupObj.yCoord = Math.min(newGroupObj.yCoord, block.yCoord)
		newGroupObj.y = Math.min(newGroupObj.y, block.y)
		return newGroupObj
	}, {})
	newGroupObj.blocks = blocks
	newGroupObj.type = group.type
	newGroupObj.width = group.x2 - group.x
	newGroupObj.height = Math.max(...blocks.map(b => b.y)) + window.delta - group.y
	return newGroupObj
}
export default (state = initialState.canvas, action) => {
	switch (action.type) {
		case 'CREATE_BLOCK': {
			const yCoord = Math.floor(action.payload.y / window.delta)
			const occupied = state.groups.find(b => b.yCoord === yCoord)
			if(occupied !== undefined) return state
			const y = yCoord * window.delta
			const xCoord = Math.floor(action.payload.x / window.delta)
			const x = xCoord * window.delta
			const x2Coord = xCoord + 1
			const x2 = x2Coord * window.delta
			const fill = `hsl(${Math.floor(Math.random() * 12) * 30}, 100%, 50%)` // hue = 360 / 12
			const width = window.delta
			const height = window.delta
			const block = {xCoord, x, x2Coord, x2, yCoord, y, width, height, fill}
			const gIdx = findGroupIdx(state.groups, block)
			if(gIdx > -1) {
				const blocks = [...state.groups[gIdx].blocks, block] 
				const bIdx = blocks.length - 1
				const group = newGroup(state.groups[gIdx], blocks)
				return {
					editIndices: { gIdx, bIdx },
					groups: state.groups.map((grp,i) => {
						if(i !== gIdx) return grp
						return group
					})
				}
			} else {
				const type = '+'
				const blocks  = [block]
				const group = {xCoord, x, x2Coord, x2, yCoord, y, width, height, blocks, type}
				return {
					editIndices: {
						gIdx: state.groups.length,
						bIdx: 0
					},
					groups: [...state.groups, group]
				}
			}
		}
		case 'TOGGLE_EDIT':
			const editIndices = {
				gIdx: null,
				bIdx: null
			}
			if(state.editIndices.gIdx === null) {
				editIndices.gIdx = action.payload.gIdx
				editIndices.bIdx = action.payload.bIdx
			}
			return { ...state, editIndices }
		case 'RESIZE_BLOCK': {
			return {
				...state, groups: state.groups.map((group, i) => {
					if(i !== state.editIndices.gIdx) return group

					const blocks = group.blocks.map((block, j) => {
						if(j !== state.editIndices.bIdx) return block
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
					return newGroup(group, blocks)
				})
			}
		}
		default:
			return state
	}
}
