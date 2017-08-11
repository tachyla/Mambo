import {FETCH_QUESTIONS_REQUEST, FETCH_QUESTIONS_SUCCESS, FETCH_QUESTIONS_ERROR,
  FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR, NEXT_QUESTION} from '../actions/actions';
  
  const initialState = {
    questions: [],
    currentUser: null,
    loading: false,
    error: null,
    answeredCorrectly: null,
    score: {},
    googleId: null
  };
  
  export default function reducer(state=initialState, action) {
      
    if(action.type === FETCH_QUESTIONS_REQUEST) {
      return {...state, loading: true, error: null}
    }
    else if(action.type === FETCH_QUESTIONS_ERROR) {
      return {...state, loading: false, error: action.error}
    }
    else if(action.type === FETCH_QUESTIONS_SUCCESS) {
      return{...state, questions: action.questions, loading: false, error: null}
    }
    else if(action.type === FETCH_USER_REQUEST) {
      return {...state, loading: true, error: null}
    }
    else if(action.type === FETCH_USER_ERROR) {
      return {...state, loading: false, error: action.error}
    }
    else if(action.type === FETCH_USER_SUCCESS) {
      return{...state, currentUser: action.user.name, loading: false, error: null, googleId: action.user.googleId, score: action.user.score}
    }
    else if(action.type === NEXT_QUESTION) {
      let newScore;
      if(!state.score.hasOwnProperty(action.currentQuestion)) {
        newScore = [0, 0];
      }
      else {
        newScore = [...state.score[action.currentQuestion]]
      }
      newScore[0] += action.numerator;
      newScore[1] += action.denominator;
       return{...state, answeredCorrectly: action.boolean, score: {
         ...state.score,
         [action.currentQuestion]: newScore
        }}
    }
    return state;
  }