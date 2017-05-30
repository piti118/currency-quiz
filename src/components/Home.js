import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="home-text vcenter">
        <div>
          <h1>Welcome to Currency Quiz</h1>
          <div style={{ fontSize: 'small', paddingTop: '20px' }}>
          Find the source code <a href="https://github.com/piti118/currency-quiz">here.
        </a></div>
          <div style={{ fontSize: 'small' }}>
          Currency API from <a href="http://fixer.io">fixer.io</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
