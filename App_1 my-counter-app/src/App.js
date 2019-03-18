import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import "./App.css";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const resettedArray = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters: resettedArray });
  };

  handleIncrement = counter => {
    const newCounters = [...this.state.counters];
    const indexOfUpdatedItem = newCounters.indexOf(counter);
    newCounters[indexOfUpdatedItem] = { ...counter };
    newCounters[indexOfUpdatedItem].value++;
    this.setState({ counters: newCounters });
  };

  handleDecrement = counter => {
    const newCounters = [...this.state.counters];
    const indexOfUpdatedItem = newCounters.indexOf(counter);
    newCounters[indexOfUpdatedItem] = { ...counter };
    newCounters[indexOfUpdatedItem].value--;
    this.setState({ counters: newCounters });
  };

  render() {
    console.log("App has been rendered");
    return (
      <React.Fragment>
        <NavBar
          numberOfCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
