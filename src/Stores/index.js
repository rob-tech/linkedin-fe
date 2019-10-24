import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import profileReducer from "../Reducers/profiles";
import feedsReducer from "../Reducers/feeds";
import errReducer from "../Reducers/errMess";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  profile: {
    userProfile: [],
    userExperiences: [],
    allProfiles: []
  },

  feeds: {
    userFeeds: [],
    postFeeds: []
  },

  errMess: {
    message: null
  },

};

const combReducer = combineReducers({ profile: profileReducer, feeds: feedsReducer, errMess: errReducer });

export default function configureStore() {
  return createStore(
    combReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}