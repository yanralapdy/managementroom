import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import login from '../screen/Login';
import loading from '../screen/Loading';
import navBar from './NavBarHome';

const mainNav = createStackNavigator(
  {
    login: {
      screen: login,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    loading: {
      screen: loading,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
    home: {
      screen: navBar,
      navigationOptions: ({navigation}) => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'loading',
  },
);

export default createAppContainer(mainNav);
