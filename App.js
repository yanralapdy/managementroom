import React, {Component} from 'react';
import {Provider} from 'react-redux';

import MainNav from './src/navigation/MainNav';
import {store} from './src/redux/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainNav />
      </Provider>
    );
  }
}
