import {FETCH_QUESTIONS_REQUEST, FETCH_QUESTIONS_SUCCESS, FETCH_QUESTIONS_ERROR,
FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR, NEXT_QUESTION} from '../actions/actions';
// import LinkedList from '../linkedList';

const initialState = {
  questions: [],
  currentUser: null,
  loading: false,
  error: null,
  currentQuestion: 0,
  answeredCorrectly: null,
  score: {}
};


export default function reducer(state=initialState, action) {
    
  if(action.type === FETCH_QUESTIONS_REQUEST) {
    return {...state, loading: true, error: null}
  }
  else if(action.type === FETCH_QUESTIONS_ERROR) {
    return {...state, loading: false, error: action.error}
  }
  else if(action.type === FETCH_QUESTIONS_SUCCESS) {
    console.log(action.questions)
      return{...state, questions: action.questions, loading: false, error: null}
  }
  else if(action.type === FETCH_USER_REQUEST) {
      return {...state, loading: true, error: null}
  }
  else if(action.type === FETCH_USER_ERROR) {
       return {...state, loading: false, error: action.error}
  }
  else if(action.type === FETCH_USER_SUCCESS) {
      console.log(action.user)
      return{...state, currentUser: action.user.name, loading: false, error: null}
  }
  else if(action.type === NEXT_QUESTION) {
    console.log(action.numerator)
    if(!state.score.hasOwnProperty(action.currentQuestion)) {
      state.score[action.currentQuestion] = [0,0]
    }
    state.score[action.currentQuestion][0] += action.numerator;
    state.score[action.currentQuestion][1] += action.denominator;
     return{...state, currentQuestion: action.counter, answeredCorrectly: action.boolean, score: {...state.score}}
  }
  return state;
}


