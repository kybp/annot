import Actions from '../actions'

const controls = (state: JSX.Element[] = [], action: any) => {
  switch (action.type) {

  case Actions.ADD_CONTROL:
    return state.concat(action.control)

  case Actions.CLEAR_CONTROLS:
    return []

  default:
    return state

  }
}

export default controls
