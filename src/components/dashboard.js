import React from 'react';
import Gmail from './apps/gmail.js';
import Reddit from './apps/reddit.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'JDuong',
      mainView: 'home'
    }
  }

  changeView(newView) {
    this.setState({ mainView: newView });
  }

  renderMainView() {
    const { mainView } = this.state;

    if (mainView === 'gmail') {
      return <Gmail />;
    } else if (mainView === 'reddit') {
      return <Reddit />;
    } else {
      return (
        <ul>
          <li>Hello</li>
          <li>Yo</li>
        </ul>
      );
    }
  }

  render() {
    const { username } = this.state;

    return (
      <div>
        <h1>Hello {username}</h1>
        <ul>
          <li><button onClick={() => this.changeView('gmail')}>Gmail</button></li>
          <li><button onClick={() => this.changeView('reddit')}>Reddit</button></li>
        </ul>
        {this.renderMainView()}
      </div>
    );
  }
};

export default Dashboard;