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
    if (nextProps.questions.length > 0 && this.state.myLinkedList.length === 0 ) {
      nextProps.questions.forEach((question, index) => {
      this.state.myLinkedList.insert(index, question);
      });
    }
  }

  checkAnswer() {
    let linkedlist = this.state.myLinkedList;
    let index = this.state.index;
    let currentQuestion = linkedlist.get(index).question;

    if (this.state.value.toLowerCase() === linkedlist.get(index).answer.toLowerCase()) {
      linkedlist.insert(linkedlist.length, linkedlist.get(index));
      this.setState({ index: index + 1 });
      this.props.dispatch(nextQuestion(index + 1, true, 1, 1, currentQuestion));
      this.setState({ value: "" });
    } else {
      linkedlist.insert(index + 3, linkedlist.get(index));
      this.setState({ index: index + 1 });
      this.props.dispatch(nextQuestion(index + 1, false, 0, 1, currentQuestion));
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
    let feedback;

    if (this.props.answeredCorrectly === true) {
      let prevQuestion = this.props.score[this.state.myLinkedList.get(this.state.index - 1).question];
      let score = prevQuestion[0] / prevQuestion[1];
      let prevWord = this.state.myLinkedList.get(this.state.index - 1);
      feedback = (
        <div>
          <p>Correct!!! Great Job!</p>
          <p>
            You have answered {prevWord.question} correctly{" "}
            {(score * 100).toFixed(0)}% of the time!
          </p>
        </div>
      );
    }
    if (this.props.answeredCorrectly === false) {
      let prevQuestion = this.props.score[ this.state.myLinkedList.get(this.state.index - 1).question];
      let score = prevQuestion[0] / prevQuestion[1];
      let prevWord = this.state.myLinkedList.get(this.state.index - 1);
      feedback = (
        <div>
          <p>
            Incorrect!!! The correct answer was {prevWord.answer}!!!
          </p>
          <p>
            You have answered {prevWord.question} correctly{" "}
            {(score * 100).toFixed(0)}% of the time!
          </p>
        </div>
      );
    }

    return (
      <div>
        <ul className="question-list">
          <li>{this.state.myLinkedList.get(this.state.index).question}</li>
        </ul>
        <button className="submit-button" onClick={this.checkAnswer}>
          Submit
        </button>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        {feedback}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
  answeredCorrectly: state.answeredCorrectly,
  score: state.score
});

export default connect(mapStateToProps)(QuestionPage);
