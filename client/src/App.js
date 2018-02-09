import React, {Component, PropTypes} from 'react';
import {Router, browserHistory, Route, Link} from 'react-router'
import Home from './components/Home';
import About from './components/About';
import './App.css';

class Layout extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      showingHomeOnly: false
    };

    context.store.subscribe(()=>{
      let state = context.store.getState();
    });

    this.renderLink = this.renderLink.bind(this);
  }

  renderLink(pathname, linkname) {
    if(pathname === '' || !this.state.showingHomeOnly) {
      return <li className={this.props.location.pathname === `/${pathname}` ? "active" : ""}><Link to={`/${pathname}`}>{linkname}</Link></li>
    }
  }

  render() {

    return (
      <div className="container">
        <div className="navbar navbar-inverse">
          <div className="navbar-header">
            <span className="navbar-brand">double<span className="sf-blue">Helix</span></span>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {this.renderLink('','Home')}
            {this.renderLink('about','About')}

          </ul>
        </div>
        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node
};

Layout.contextTypes = {
  store: PropTypes.object
};

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={Layout}>
          <Route path="/" component={Home}/>
          <Route path="/about" component={About}/>
        </Route>
      </Router>
    );
  }
}

export default App;
