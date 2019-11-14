/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  Image,
  Dimensions,
} from 'react-native';
import {Header, Title, Body, Card} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
// const image= this.props.navigation.getParam('image');
// const profName= this.props.navigation.getParam('name');
const {height, width} = Dimensions.get('window');
export class Profile extends Component {
  state = {
    // image: this.props.adminsLocal.login.image,
    // name: this.props.adminsLocal.login.name,
    // email: this.props.adminsLocal.login.email,
    image: '',
    name: '',
    email: '',
  };
  async componentDidMount() {
    const image = await AsyncStorage.getItem('image');
    const name = await AsyncStorage.getItem('name');
    const email = await AsyncStorage.getItem('email');
    this.setData(image, name, email);
  }
  async setData(image, name, email) {
    this.setState({name, image, email});
  }
  async handleLogOut() {
    await AsyncStorage.removeItem('token');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'login'})],
    });
    this.props.navigation.dispatch(resetAction);
  }
  handleEditProfile(item) {
    this.props.navigation.navigate('editProfile', {name: item});
  }
  handleMytoon() {
    this.props.navigation.navigate('myWebToon');
  }
  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.mainView}>
        <View style={{flex: 1}}>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.titleHeader}> Admins </Title>
            </Body>
          </Header>
        </View>
        <Card style={styles.profile}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={{uri: this.state.image}}
              style={styles.iconProfile}
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.iconName}>
              {'Email   : '}
              {this.state.email}
            </Text>
            <Text style={styles.iconName}>
              {'Name   : '}
              {this.state.name}
            </Text>
          </View>
        </Card>
        <View style={styles.logout}>
          <View style={styles.viewButtonText}>
            <TouchableOpacity
              style={styles.opacity}
              onPress={() => this.handleLogOut()}>
              <Text style={styles.text}> Log Out </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     adminsLocal: state.login,
//   };
// };
export default connect(/*mapStateToProps}*/)(Profile);

const styles = {
  header: {
    backgroundColor: '#718093',
    height: height * 0.09,
  },
  titleHeader: {
    color: 'white',
    fontSize: height * 0.04,
    alignSelf: 'center',
  },
  iconHeader: {
    color: 'orange',
    fontSize: 50,
    marginRight: 10,
  },
  profile: {
    marginTop: height * 0.04,
    alignSelf: 'center',
    height: height * 0.2,
    width: width * 0.95,
    flexDirection: 'row',
    borderRadius: width * 0.425,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2f3640',
  },
  mainView: {
    backgroundColor: '#dfe4ea',
    flex: 1,
  },
  iconProfile: {
    borderWidth: 1,
    borderColor: '#f1f2f6',
    width: height * 0.17,
    height: height * 0.17,
    borderRadius: height * 0.085,
    alignSelf: 'center',
  },
  iconName: {
    fontSize: height * 0.035,
    marginStart: width * 0.03,
    color: 'white',
  },
  viewButtonText: {
    backgroundColor: '#353b48',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.01,
    flex: 0.14,
    width: width * 0.4,
    borderRadius: 15,
  },
  logout: {
    marginTop: height * 0.04,
    flex: 5.2,
  },
  opacity: {
    flex: 1,
    alignSelf: 'center',
  },
  text: {
    fontSize: height * 0.04,
    color: 'white',
  },
};
