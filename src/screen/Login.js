/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {Button, Input, Item} from 'native-base';
import {StackActions, NavigationActions} from 'react-navigation';
import PasswordInputText from 'react-native-hide-show-password-input';
import * as actionUsers from './../redux/actions/actionUsers';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isPasswordValid: false,
      isMailValid: false,
      creative: true,
      spin: false,
    };
  }

  checkPassword(pass) {
    if (pass === '') {
      this.setState({isPasswordValid: false});
    } else {
      this.setState({isPasswordValid: true});
    }
    this.setState({password: pass});
  }
  checkMail(mail) {
    this.setState({email: mail});
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(mail)) {
      return this.setState({isMailValid: true});
    } else {
      return this.setState({isMailValid: false});
    }
  }
  check(mail, pass) {
    if (mail === true && pass === true) {
      return false;
    } else {
      return true;
    }
  }
  async handleLogin() {
    this.setState({spin: true});
    const email = this.state.email;
    const password = this.state.password;
    await this.props.handleLogin(email, password);
    const users = this.props.userLocal.login;
    if (users.token) {
      await AsyncStorage.multiSet([
        ['token', users.token],
        ['userid', `${users.id}`],
        ['name', users.name],
        ['email', users.email],
        ['image', users.image],
      ]);
      this.setState({spin: false});
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'loading'})],
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      alert('Invalid email or password!');
      this.setState({spin: false});
    }
  }

  render() {
    console.disableYellowBox = true;
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          style={styles.imageBackground}
          source={{
            uri:
              'https://m.media-amazon.com/images/M/MV5BNzQ2MzQzNDktMTg4ZC00ZDE0LThhNmUtYWMxYmI3OTIzYzZlXkEyXkFqcGdeQXVyMzE4MDkyNTA@._V1_.jpg',
          }}>
          <KeyboardAvoidingView style={styles.dim} behavior="padding" enabled>
            <View style={styles.subViewTitle}>
              <Text style={styles.title}> Welcome </Text>
              <Text style={styles.subTitle}>
                {' '}
                Please input your login information{' '}
              </Text>
            </View>
            <View style={styles.subViewInput}>
              <Text style={styles.inputTitle}> Email </Text>
              <Item style={styles.itemPass}>
                <Input
                  onChangeText={text => this.checkMail(text)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="Input your email"
                  style={styles.input}
                />
              </Item>
              <Text style={styles.inputTitle}> Password </Text>
              <Item style={styles.itemPass}>
                <Input
                  placeholder="input your password"
                  style={styles.input}
                  secureTextEntry={this.state.creative}
                  onChangeText={password => this.checkPassword(password)}
                />
                <Icon
                  onPress={() =>
                    this.setState({creative: !this.state.creative})
                  }
                  name={this.state.creative == true ? 'eye' : 'eye-slash'}
                  style={styles.icon}
                />
              </Item>
              <Button
                rounded
                style={styles.button}
                onPress={() => this.handleLogin()}
                disabled={this.check(
                  this.state.isMailValid,
                  this.state.isPasswordValid,
                )}>
                <Text style={styles.butIn}>Login</Text>
              </Button>
            </View>
            <Spinner
              visible={this.state.spin}
              textContent={'Loading...'}
              textStyle={styles.spinnerTextStyle}
            />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLocal: state.login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (email, password) =>
      dispatch(actionUsers.handleLogin(email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

const styles = StyleSheet.create({
  title: {
    fontSize: 90,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#eccc68',
  },
  subTitle: {
    fontSize: 30,
    textAlign: 'center',
    color: '#eccc68',
  },
  subViewTitle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: height * 0.17,
  },
  subViewInput: {
    flex: 2,
    marginHorizontal: height * 0.018,
  },
  subViewLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    height,
    width,
  },
  dim: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height,
    width,
    justifyContent: 'center',
  },
  inputTitle: {
    alignItems: 'flex-start',
    color: '#dff9fb',
    fontSize: 30,
  },
  input: {
    color: '#30336b',
    fontSize: 25,
  },
  itemPass: {
    backgroundColor: '#ffeaa7',
    borderRadius: height * 0.06,
    height: height * 0.06,
    marginVertical: height * 0.005,
    paddingHorizontal: width * 0.03,
  },
  icon: {
    color: 'black',
    fontSize: width * 0.05,
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    height: height * 0.06,
  },
  butIn: {
    color: '#dff9fb',
    fontSize: 25,
  },
});
