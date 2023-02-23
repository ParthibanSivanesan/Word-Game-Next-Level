import React, { Component } from 'react';
import './index.css'


const WORD_LIST = [
  { answer: 'YOUTUBE', hint: 'Like share and subscribe.' },
  { answer: 'AMAZON', hint: 'Online shopping.' },
  { answer: 'REACT', hint: 'Javascript library.' },
  { answer: 'AVENGERS', hint: 'Infinity war.' },
  { answer: 'DIAMOND', hint: 'Can cut the glass.' },
  { answer: 'AVATAR', hint: 'The way of water.' },
  { answer: 'WIKIPEADIA', hint: 'Online dictionary.' },
  { answer: 'JAVASCRIPT', hint: 'Dynamic Language.' },
  { answer: 'AEROPLANE', hint: 'Travel on the air.' },
  { answer: 'FACEBOOK', hint: 'Social Media App.' },
];

class App extends Component {
  constructor() {
    super();

    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    const { answer, hint } = WORD_LIST[randomIndex];

    this.state = {
      answer,
      hint,
      userInput: '',
      userAttempts: 0,
      userChances: 5,
      inputFields: Array.from({ length: answer.length }, () => ''),
      gameEnded: false,
      gameWon: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ userInput: event.target.value.toUpperCase() });
  };

  isValidInput = () => {
    const { userInput } = this.state;

    return userInput.length >= 1;
  };

  handleSubmit = () => {
    const { answer, userInput, inputFields, userAttempts, userChances } =
      this.state;
    let newInputFields = [...inputFields];
    let newGameEnded = false;
    let newGameWon = false;

    if (userInput.length === 1) {
      if (answer.includes(userInput)) {
        answer.split('').forEach((char, index) => {
          if (char === userInput) {
            newInputFields[index] = char;
          }
        });
      } else {
        this.setState({ userChances: userChances - 1 });
      }
    } else {
      if (userInput === answer) {
        newInputFields = answer.split('');
        newGameEnded = true;
        newGameWon = true;
      } else {
        this.setState({ userChances: userChances - 1 });
      }
    }

    if (newInputFields.join('') === answer) {
      newGameWon = true;
      newGameEnded = true;
    }

    this.setState({
      inputFields: newInputFields,
      userInput: '',
      userAttempts: userAttempts + 1,
      gameEnded: newGameEnded,
      gameWon: newGameWon,
    });

    if (userChances === 1) {
      this.setState({ gameEnded: true });
    }
  };

  startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    const { answer, hint } = WORD_LIST[randomIndex];

    this.setState({
      answer,
      hint,
      userInput: '',
      userAttempts: 0,
      userChances: 5,
      inputFields: Array.from({ length: answer.length }, () => ''),
      gameEnded: false,
      gameWon: false,
    });
  };

  render() {
    const {
      hint,
      inputFields,
      userInput,
      userAttempts,
      userChances,
      gameEnded,
      gameWon,
    } = this.state;

    return (
      <div>
        <h1><b><center>Word Game</center></b></h1>
        <div className="input-fields">
          {inputFields.map((field, index) => (
            <input className="inputbox" key={index} type="text" value={field} readOnly/>
          ))}
        </div>
        <br />

        <div className="hint">
          <b>Hint: </b>
          <span className="message">{hint}</span>
        </div>
        <br />

        <div className="user-input">
          <b>Enter Your Answer: </b>
          <input
            type="text"
            value={userInput}
            onChange={this.handleInputChange}
          />
          <button disabled={!this.isValidInput()} onClick={this.handleSubmit}>
            <div>Submit</div>
          </button>
        </div>
        <div className="message">
          {gameWon && <div>Congratulations!!</div>}
          {gameEnded && !gameWon && <div>Try again!</div>}
          {!gameEnded && (
            <div>
             <b>Attempts:</b> {userAttempts}<br></br>
             <br></br><b>Chances Left:</b> {userChances}
            </div>
          )}
          {gameEnded && <button className="button" onClick={this.startNewGame}><b>Try Again</b></button>}
        </div>
      </div>
    );
  }
}


export default App;
