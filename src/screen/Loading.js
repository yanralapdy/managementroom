import React, {Component} from 'react';
import {View, AsyncStorage, ImageBackground, Dimensions} from 'react-native';
import {Text, Spinner} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';
import * as actionCustomer from './../redux/actions/actionCustomers';
import * as actionRoom from './../redux/actions/actionRooms';
import * as actionCheckin from './../redux/actions/actionOrders';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');
class Loading extends Component {
  componentDidMount() {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      if (token === null) {
        this.props.navigation.navigate('login');
      } else {
        await this.props.handleGetRooms(token);
        await this.props.handleGetCust(token);
        await this.props.handleGetCheckin(token);
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'home'})],
        });
        this.props.navigation.dispatch(resetAction);
      }
    }, 1000);
  }
  render() {
    console.disableYellowBox = true;
    return (
      <ImageBackground
        style={styles.imgBg}
        source={{
          uri:
            'https://m.media-amazon.com/images/M/MV5BNzQ2MzQzNDktMTg4ZC00ZDE0LThhNmUtYWMxYmI3OTIzYzZlXkEyXkFqcGdeQXVyMzE4MDkyNTA@._V1_.jpg',
        }}>
        <View style={styles.view}>
          <Text style={styles.text}>Welcome{'\n'}Please Wait </Text>
          <Spinner visible={true} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  view: {
    flex: 1,
    justifyContent: 'center',
    height,
    width,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  text: {
    fontSize: 80,
    textAlign: 'center',
    color: '#eccc68',
  },
  imgBg: {
    flex: 1,
    height,
    width,
    alignItems: 'center',
  },
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetRooms: tok => dispatch(actionRoom.handleGetRooms(tok)),
    handleGetCust: tok => dispatch(actionCustomer.handleGetCust(tok)),
    handleGetCheckin: tok => dispatch(actionCheckin.handleGetCheckins(tok)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loading);
