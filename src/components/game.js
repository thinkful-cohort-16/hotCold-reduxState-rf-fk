import React from "react";

import Header from "./header";
import GuessSection from "./guess-section";
import StatusSection from "./status-section";
import InfoSection from "./info-section";

import { connect } from "react-redux";
import { addGuess, reset } from "../actions";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guesses: [],
      feedback: "Make your guess!",
      auralStatus: "",
      correctAnswer: Math.round(Math.random() * 100) + 1
    };
  }

  restartGame() {
    this.props.dispatch(reset());

    this.setState({
      guesses: [],
      feedback: 'Make your guess!',
      auralStatus: '',
      correctAnswer: Math.floor(Math.random() * 100) + 1
    });
  }

  makeGuess(guess) {
    if (!isNaN(guess)) {
      this.props.dispatch(addGuess(guess));
    }
  }

  generateAuralUpdate() {
    const { guesses, feedback } = this.state;

    // If there's not exactly 1 guess, we want to
    // pluralize the nouns in this aural update.
    const pluralize = guesses.length !== 1;

    let auralStatus = `Here's the status of the game right now: ${feedback} You've made ${
      guesses.length
    } ${pluralize ? "guesses" : "guess"}.`;

    if (guesses.length > 0) {
      auralStatus += ` ${
        pluralize ? "In order of most- to least-recent, they are" : "It was"
      }: ${guesses.reverse().join(", ")}`;
    }
    this.setState({ auralStatus });
  }

  render() {
    const { feedback, guesses, auralStatus } = this.state;
    const guessCount = guesses.length;

    return (
      <div>
        <Header
          onRestartGame={() => this.restartGame()}
          onGenerateAuralUpdate={() => this.generateAuralUpdate()}
        />
        <main role="main">
          <GuessSection
            feedback={feedback}
            guessCount={guessCount}
            onMakeGuess={guess => this.makeGuess(guess)}
          />
          <StatusSection guesses={guesses} auralStatus={auralStatus} />
          <InfoSection />
        </main>
      </div>
    );
  }
}
//export default connect()(Game)

const mapStateToProps = (state, props) => {
  return {
    guesses: state.guesses
  };
};

export default connect(mapStateToProps)(Game);