import React from "react";
import * as Cookies from "js-cookie";
import { connect } from "react-redux";
import { fetchQuestions, nextQuestion } from "../actions/actions";
import LinkedList from "../linkedList";

export class QuestionPage extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      myLinkedList: new LinkedList(),
      index: 0,
      value: ""
    };
  }

  componentDidMount() {
    const accessToken = Cookies.get("accessToken");
    this.props.dispatch(fetchQuestions(accessToken));
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.questions.length > 0 &&
      this.state.myLinkedList.length === 0
    ) {
      nextProps.questions.forEach((question, index) => {
        this.state.myLinkedList.insert(index, question);
      });
    }
  }

  checkAnswer() {
    let linkedlist = this.state.myLinkedList;

    // let currentQuestion = linkedlist.get(0).question;
    console.log(this.state.value);
    console.log(linkedlist.get(this.state.index).answer);

    if (
      this.state.value.toLowerCase() ===
      linkedlist.get(this.state.index).answer.toLowerCase()
    ) {
      console.log(this.state.value);
      console.log(linkedlist.get(this.state.index).answer);
      linkedlist.insert(linkedlist.length, linkedlist.get(this.state.index));
      this.setState({ index: this.state.index + 1 });
      //put this dispatch attached to an onlick of the next button
      this.props.dispatch(nextQuestion(this.state.index + 1, true, 1, 1));
      this.setState({ value: "" });
    } else {
      linkedlist.insert(this.state.index + 3, linkedlist.get(this.state.index));
      this.setState({ index: this.state.index + 1 });
      this.props.dispatch(nextQuestion(this.state.index + 1, false, 0, 1));
      this.setState({ value: "" });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    if (this.props.questions.length <= 0) {
      return <div />;
    }

    if (this.props.answeredCorrectly === true) {
      return (
        <div>
          <ul className="question-list">
            {this.state.myLinkedList.get(this.props.currentQuestion).question}
          </ul>
          <button className="submit-button" onClick={this.checkAnswer}>
            Submit
          </button>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <p>Correct!!! Great Job!</p>
        </div>
      );
    }
    if (this.props.answeredCorrectly === false) {
      return (
        <div>
          <ul className="question-list">
            {this.state.myLinkedList.get(this.props.currentQuestion).question}
          </ul>
          <button className="submit-button" onClick={this.checkAnswer}>
            Submit
          </button>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <p>Incorrect!!! The correct answer was {this.state.myLinkedList.get(this.props.currentQuestion-1).answer}!!!</p>
        </div>
      );
    }

    return (
      <div>
        <ul className="question-list">
          {this.state.myLinkedList.get(this.props.currentQuestion).question}
        </ul>
        <button className="submit-button" onClick={this.checkAnswer}>
          Submit
        </button>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
  currentQuestion: state.currentQuestion,
  answeredCorrectly: state.answeredCorrectly,
  score: state.score
});

export default connect(mapStateToProps)(QuestionPage);

//have a counter, display questions until counter hits a certain number, lets say 50
//have 2 linked list, one with questions, one with answers
// while counter < 50
// current index = 0
// if userInput === answers.get(index)
//  questions.remove(index) and answers.remove(index)
//THEN questions.insert(this.length, get(index)) and  answers.insert(this.length, get(index))
//counter ++ index++
//ELSE
//  questions.remove(index) and answers.remove(index)
//THEN questions.insert(index+2, get(index)) and  answers.insert(index+2, get(index))
//counter++ index ++

//app loads the first question in the array.
//On submittal of answer, check to see if the answer was correct
// show feedback if correct or incorrect, adjust the linked list
//move onto next question

// let index = 0;
//         let userInput = 'Donald'
//         let currentQuestion = this.state.myLinkedList.get(index).question;

//         if(userInput === this.state.myLinkedList.get(index).answer) {
//                 //put this dispatch attached to an onlick of the next button
//                 this.props.dispatch(nextQuestion(index++))
//                 this.setState({showResults: true})
//             }

//submit button 2 actions of numerator and denomitor
// if action.bool = true do this else do that
