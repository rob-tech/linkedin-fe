export default function(state = {}, action) {
    switch (action.type) {
      case "USER_PROFILE":
        return {
          ...state,
          userProfile: state.userProfile.concat(action.payload)
        };
        case "USER_EXPERIENCES":
          return {
            ...state,
            userExperiences: state.userExperiences.concat(action.payload)
          };
          case "ALL_PROFILES":
            return {
              ...state,
              allProfiles: state.allProfiles.concat(action.payload)
            };
      default:
        return state;
    }
  }