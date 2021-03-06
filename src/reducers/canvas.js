import initialState from '../initialState'
// hue = 360 / 12
const getRandomColor = _ => `hsl(${Math.floor(Math.random() * 12) * 30}, 100%, 50%)`
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
			const total = parseInt(x2Coord - xCoord, 10)
			const math = total.toFixed()
			return {xCoord, x, x2Coord, x2, yCoord, y, math, total}
		}
		newGroupObj.xCoord = Math.min(newGroupObj.xCoord, block.xCoord)
		newGroupObj.x = Math.min(newGroupObj.x, block.x)
		newGroupObj.x2Coord = Math.max(newGroupObj.x2Coord, block.x2Coord)
		newGroupObj.x2 = Math.max(newGroupObj.x2, block.x2)
		newGroupObj.yCoord = Math.min(newGroupObj.yCoord, block.yCoord)
		newGroupObj.y = Math.min(newGroupObj.y, block.y)
		newGroupObj.total += parseInt(block.x2Coord - block.xCoord, 10)
		newGroupObj.math += ` + ${(block.x2Coord - block.xCoord).toFixed()}`
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
			const occupied = state.groups.find(g => 
				(yCoord >= g.yCoord) && 
				(yCoord < g.yCoord + g.blocks.length)
			)
			if(occupied !== undefined) return state
			const y = yCoord * window.delta
			const xCoord = Math.floor(action.payload.x / window.delta)
			const x = xCoord * window.delta
			const x2Coord = xCoord + 2
			const x2 = x2Coord * window.delta
			const fill = getRandomColor()
			const width = 2 * window.delta
			const height = window.delta
			const block = {xCoord, x, x2Coord, x2, yCoord, y, width, height, fill}
			const gIdx = findGroupIdx(state.groups, block)
			if(gIdx > -1) {
				const blocks = [...state.groups[gIdx].blocks, block] 
				const bIdx = blocks.length - 1
				return {
					editProps: { gIdx, bIdx, vertical: false },
					groups: state.groups.map((grp,i) => {
						if(i !== gIdx) return grp
						return newGroup(state.groups[gIdx], blocks)
					})
				}
			} else {
				const type = '+'
				const total = 2
				const math = 2
				const blocks  = [block]
				const group = {xCoord, x, x2Coord, x2, yCoord, y, width, height, blocks, type, total, math}
				return {
					editProps: {
						gIdx: state.groups.length,
						bIdx: 0, vertical: false
					},
					groups: [...state.groups, group]
				}
			}
		}
		case 'TOGGLE_EDIT':
			const editProps = {
				gIdx: null,
				bIdx: null,
				vertical: false
			}
			if(state.editProps.gIdx === null) {
				editProps.gIdx = action.payload.gIdx
				editProps.bIdx = action.payload.bIdx
				editProps.vertical = action.payload.vertical
			}
			return { ...state, editProps }
		case 'RESIZE_BLOCK': {
			return {
				...state, groups: state.groups.map((group, i) => {
					if(i !== state.editProps.gIdx) return group
					switch(group.type) {
						case '+': {
							const blocks = group.blocks.map((block, j) => {
								if(j !== state.editProps.bIdx) return block
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
						}
						case 'x': {
							const block = group.blocks[state.editProps.bIdx]
							if(state.editProps.vertical) {
								const yDist = action.payload.y - block.y
								const {x, xCoord, x2Coord, x2, width, height, y, yCoord, fill} = block
								const count = Math.max(2, Math.floor(yDist / window.delta))
								const w = Math.floor(x2Coord - xCoord)
								const type = group.type
								const total = count * w
								const math = `${w} ${type} ${count}`
								const blocks = [...Array(count)].map((b,i) => ({
									x, xCoord, x2, x2Coord, width, fill, height,
									y: y + (i * window.delta),
									yCoord: yCoord + i
								}))
								return {
									x, xCoord, x2, x2Coord, y, yCoord, width,
									blocks, total, type, math,
									height: height * count
								}
							} else {
								const xDist = Math.abs(action.payload.x - block.x)
								const x2Dist = Math.abs(action.payload.x - block.x2)
								const {y, yCoord, height, fill} = block
								let {x, xCoord, x2Coord, x2, width} = block
								if(xDist > x2Dist) {
									x2Coord = Math.ceil(action.payload.x / window.delta)
									x2 = x2Coord * window.delta
									width = x2 - block.x
								} else {
									xCoord = Math.floor(action.payload.x / window.delta)
									x = xCoord * window.delta
									width = block.x2 - x
								}
								const type = group.type
								const w = Math.floor(x2Coord - xCoord)
								const count = group.blocks.length
								const total = count * w
								const math = `${w} ${type} ${count}`
								const blocks = [...Array(count)].map((b,i) => ({
									x, xCoord, x2, x2Coord, width, fill, height,
									y: y + (i * window.delta),
									yCoord: yCoord + i
								}))
								return {
									x, xCoord, x2, x2Coord, y, yCoord, width,
									blocks, total, type, math,
									height: height * count
								}
							}
						}
						case '2': {
							const block = group.blocks[state.editProps.bIdx]
							if(state.editProps.vertical) {
								const yDist = action.payload.y - block.y
								const {x, xCoord, height, y, yCoord, fill} = block
								const count = Math.max(2, Math.floor(yDist / window.delta))
								const x2Coord = xCoord + count
								const x2 = x2Coord * window.delta
								const width = x2 - x
								const type = group.type
								const total = count * count
								const math = `${count} ^ ${type}`
								const blocks = [...Array(count)].map((b,i) => ({
									x, xCoord, x2, x2Coord, width, fill, height,
									y: y + (i * window.delta),
									yCoord: yCoord + i
								}))
								return {
									x, xCoord, x2, x2Coord, y, yCoord, width,
									blocks, total, type, math,
									height: height * count
								}
							} else {
								const xDist = Math.abs(action.payload.x - block.x)
								const x2Dist = Math.abs(action.payload.x - block.x2)
								const {y, yCoord, height, fill} = block
								let {x, xCoord, x2Coord, x2, width} = block
								if(xDist > x2Dist) {
									x2Coord = Math.ceil(action.payload.x / window.delta)
									x2 = x2Coord * window.delta
									width = x2 - block.x
								} else {
									xCoord = Math.floor(action.payload.x / window.delta)
									x = xCoord * window.delta
									width = block.x2 - x
								}
								const type = group.type
								const count = Math.floor(x2Coord - xCoord)
								const total = count * count
								const math = `${count} ^ ${type}`
								const blocks = [...Array(count)].map((b,i) => ({
									x, xCoord, x2, x2Coord, width, fill, height,
									y: y + (i * window.delta),
									yCoord: yCoord + i
								}))
								return {
									x, xCoord, x2, x2Coord, y, yCoord, width,
									blocks, total, type, math,
									height: height * count
								}
							}
						}
						default:
							return group
					}
				})
			}
		}
		case 'CHANGE_OPERATOR': {
			return {
				...state,
				groups: state.groups.map((group, i) => {
					if (i !== action.payload.gIdx) return group
					const type = action.payload.type
					const {x, xCoord, y, yCoord, height, fill} = group.blocks[0]
					let {width, x2, x2Coord} = group.blocks[0]
					const w = Math.floor(x2Coord - xCoord)
					let count, total, math
					switch(type) {
						case '+':
							count = Math.ceil(group.total / w)
							total = count * w
							math = Array(count).fill(w).join(` ${type} `)
						break
						case 'x': 
							count = Math.ceil(group.total / w)
							total = count * w
							math = `${w} ${type} ${count}`
						break
						case '2':
							count = Math.ceil(Math.sqrt(group.total))
							x2Coord = xCoord + count
							width = count * window.delta
							x2 = x + width
							total = count * count
							math = `${count} ^ ${type}`
						break
						default:
						break
					}

					const blocks = [...Array(count)].map((b,i) => ({
						x, xCoord, x2, x2Coord, width, height,
						fill: type === '+' ? getRandomColor() : fill,
						y: y + (i * window.delta),
						yCoord: yCoord + i
					}))
					return {
						x, xCoord, x2, x2Coord, y, yCoord, width,
						blocks, total, type, math,
						height: height * count
					}
				})
			}
		}
		default:
			return state
	}
}
