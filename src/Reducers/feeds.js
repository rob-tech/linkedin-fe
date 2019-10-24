export default function(state = {}, action) {
    switch (action.type) {
      case "USER_FEEDS":
        return {
          ...state,
          userFeeds: state.userFeeds.concat(action.payload)
        };
        case "POST_FEEDS":
          return {
            ...state,
            postFeeds: state.postFeeds.concat(action.payload)
          };
      default:
        return state;
    }
  }