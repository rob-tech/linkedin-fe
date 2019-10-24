export default function(state = {}, action) {
    switch (action.type) {
      case "ERR_MSG":
        return {
          ...state,
            message: state.message
      
        }
        default:
          return state;
    }
}