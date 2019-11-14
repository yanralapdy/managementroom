/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  Dimensions,
  AsyncStorage,
  FlatList,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import {
  Header,
  Body,
  Title,
  Button,
  Input,
  Item,
  Fab,
  Card,
  CardItem,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import * as firebase from 'firebase';
import * as actionCustomer from './../redux/actions/actionCustomers';
import moment from 'moment';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
  },
};
var firebaseConfig = {
  apiKey: 'AIzaSyAggiEF8xiE5k4OsJVWza9imk5KNJ6xMp8',
  authDomain: 'https://managementroom-cfe36.firebaseapp.com',
  databaseURL: 'https://managementroom-cfe36.firebaseio.com',
  projectId: 'managementroom-cfe36',
  storageBucket: 'gs://managementroom-cfe36.appspot.com',
  messagingSenderId: '786203632527',
  appId: '1:786203632527:web:70f7bc64e85830327521fa',
  measurementId: 'G-4RTZEJEZPB',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const {height, width} = Dimensions.get('window');
export class Customer extends Component {
  state = {
    search: '',
    id: '',
    name: '',
    identity_number: '',
    phone_number: '',
    image: '',
    isEmpName: true,
    isEmpIdCard: true,
    isEmpPhoneNum: true,
    modalAdd: false,
    modalEdit: false,
    avatarSource: '',
    spinner: this.props.custLocal.isLoading,
    spinnerImage: false,
  };
  async uploadImageAsync(uri) {
    this.setState({spinner: true});
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref()
      .child(moment().toISOString());
    const snapshot = await ref.put(blob);
    // We're done with the blob, close and release it
    blob.close();
    console.log('link', await snapshot.ref.getDownloadURL());
    this.setState({avatarSource: await snapshot.ref.getDownloadURL()});
    console.log(this.state.avatarSource);
    this.setState({spinner: false});
    return await snapshot.ref.getDownloadURL();
  }
  imagePicker() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source.uri,
        });
        this.uploadImageAsync(this.state.avatarSource);
      }
    });
  }
  listFavoriteAll(item) {
    return (
      <View key={item.id} style={{flex: 1}}>
        <Card style={styles.row}>
          <CardItem
            style={styles.listDetailCust}
            button
            onPress={() => this.showEdit(item)}>
            <View>
              <Image source={{uri: item.image}} style={styles.listCust} />
            </View>
            <View>
              <Text style={styles.title}>
                {'Name                   : '}
                {item.name}
              </Text>
              <Text style={styles.title}>
                {'Identity Number  : '}
                {item.identity_number}
              </Text>
              <Text style={styles.title}>
                {'Phone Number      : '}
                {item.phone_number}
              </Text>
            </View>
          </CardItem>
        </Card>
      </View>
    );
  }

  checkName(input) {
    if (input === '') {
      this.setState({isEmpName: true});
    } else {
      this.setState({isEmpName: false});
    }
    this.setState({name: input});
  }
  checkIdCard(input) {
    if (input === '') {
      this.setState({isEmpIdCard: true});
    } else {
      this.setState({isEmpIdCard: false});
    }
    this.setState({identity_number: input});
  }
  checkPhoneNum(input) {
    if (input === '') {
      this.setState({isEmpPhoneNum: true});
    } else {
      this.setState({isEmpPhoneNum: false});
    }
    this.setState({phone_number: input});
  }
  check(name, idCard, phoneNum) {
    if (name === false && idCard === false && phoneNum === false) {
      return false;
    } else {
      return true;
    }
  }
  showEdit(item) {
    this.setState({
      id: item.id,
      name: item.name,
      identity_number: item.identity_number,
      phone_number: item.phone_number,
      image: item.image,
      avatarSource: item.image,
      modalEdit: true,
      isEmpName: false,
      isEmpIdCard: false,
      isEmpPhoneNum: false,
    });
  }
  async delCustomer() {
    this.setState({spinner: true});
    const {id} = this.state;
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleDeleteCustomer(tok, id);
    this.getData();
    this.setState({
      modalEdit: false,
      avatarSource: '',
      spinner: this.props.custLocal.isLoading,
    });
  }
  async editCustomer() {
    this.setState({spinner: true});
    const {id, name, identity_number, phone_number, avatarSource} = this.state;
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleEditCustomer(
      tok,
      id,
      name,
      identity_number,
      phone_number,
      avatarSource,
    );
    this.getData();
    this.setState({
      modalEdit: false,
      avatarSource: '',
      spinner: this.props.custLocal.isLoading,
    });
    console.log(this.state.spinner);
  }
  async addCustomer() {
    this.setState({spinner: true});
    const {name, identity_number, phone_number, avatarSource} = this.state;
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleAddCustomer(
      tok,
      name,
      identity_number,
      phone_number,
      avatarSource,
    );
    this.getData();
    this.setState({modalAdd: false, avatarSource: '', spinner: false});
  }
  getData = async () => {
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleGetCustomer(tok);
  };

  handleSearch(item) {
    this.setState({search: item.toLowerCase()});
  }

  render() {
    console.disableYellowBox = true;
    const {cust} = this.props.custLocal;
    const {name, identity_number, phone_number, image} = this.state;
    return (
      <View style={styles.mainView}>
        <View style={{flex: 1}}>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.titleHeader}> Customers </Title>
            </Body>
          </Header>
        </View>
        <View style={{flex: 9, alignSelf: 'center'}}>
          <ImageBackground
            style={styles.imgBg}
            source={{
              uri:
                'https://ak3.picdn.net/shutterstock/videos/21658243/thumb/1.jpg',
            }}>
            <View style={{flex: 0.9, marginVertical: height * 0.015}}>
              <View style={styles.view}>
                <Input
                  style={styles.searchBar}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="Looking for something ..."
                  onChangeText={item => this.handleSearch(item)}
                />
                <TouchableOpacity>
                  <Icon name="search" style={styles.search} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 10}}>
              <FlatList
                data={cust.filter(item =>
                  item.name.toLowerCase().includes(this.state.search),
                )}
                renderItem={({item}) => this.listFavoriteAll(item)}
                keyExtractor={item => item.title}
                style={{flex: 1}}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={{position: 'relative'}}>
          <Fab
            onPress={() => this.setState({modalAdd: true})}
            active="true"
            style={styles.fab}
            position="bottomRight">
            <Icon style={styles.fabIcon} name="plus" />
          </Fab>
        </View>
        {/* Modal that is used to Add a New Room */}
        <Modal
          visible={this.state.modalAdd}
          transparent={true}
          animationType={'fade'}>
          <KeyboardAvoidingView style={styles.dimBg} behavior="padding" enabled>
            <View style={styles.modalBg}>
              <View style={styles.subViewTitle}>
                <Text style={styles.titleView}> Add New Customer </Text>
              </View>
              <View style={styles.subViewInput}>
                <Text style={styles.modalItem}> Name :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkName(input)}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Input Customer Name"
                  />
                </Item>
                <Text style={styles.modalItem}> Identity number :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkIdCard(input)}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    placeholder="Input Customer Identity Number"
                  />
                </Item>
                <Text style={styles.modalItem}> Phone Number :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkPhoneNum(input)}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="phone-pad"
                    placeholder="Input Customer Phone Number"
                  />
                </Item>
                <TouchableOpacity onPress={() => this.imagePicker()}>
                  {this.state.avatarSource === '' ? (
                    <Image
                      style={styles.imageProfile}
                      source={{
                        uri:
                          'https://p7.hiclipart.com/preview/858/581/271/user-computer-icons-system-chinese-wind-title-column.jpg',
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: this.state.avatarSource}}
                      style={styles.imageProfile}
                    />
                  )}
                  <Icon name="camera" style={styles.iconProfile} />
                </TouchableOpacity>
                <View style={styles.viewModalButt2}>
                  <Button
                    rounded
                    style={styles.buttonX}
                    onPress={() =>
                      this.setState({
                        modalAdd: false,
                        name: '',
                        id: '',
                        identity_number: '',
                        phone_number: '',
                        isEmpName: true,
                        isEmpIdCard: true,
                        isEmpPhoneNum: true,
                        avatarSource: '',
                      })
                    }
                    disabled={false}>
                    <Text style={styles.buttonTextX}> Cancel </Text>
                  </Button>
                  <Button
                    rounded
                    style={styles.buttonY}
                    onPress={() => this.addCustomer()}
                    disabled={this.check(
                      this.state.isEmpName,
                      this.state.isEmpIdCard,
                      this.state.isEmpPhoneNum,
                    )}>
                    <Text style={styles.buttonTextY}> Add </Text>
                  </Button>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        {/* Modal that use to Edit an existing room */}
        <Modal
          visible={this.state.modalEdit}
          transparent={true}
          animationType={'fade'}>
          <KeyboardAvoidingView style={styles.dimBg} behavior="padding" enabled>
            <View style={styles.modalBg}>
              <View style={styles.subViewTitle}>
                <Text style={styles.titleView}> Update Customer </Text>
              </View>
              <View style={styles.subViewInput}>
                <Text style={styles.modalItem}> Name :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkName(input)}
                    value={name}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Input Customer Name"
                  />
                </Item>
                <Text style={styles.modalItem}> Identity number :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkIdCard(input)}
                    value={identity_number}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="phone-pad"
                    placeholder="Input Customer Identity Number"
                  />
                </Item>
                <Text style={styles.modalItem}> Phone Number :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkPhoneNum(input)}
                    value={phone_number}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    placeholder="Input Customer Phone Number"
                  />
                </Item>
                <TouchableOpacity onPress={() => this.imagePicker()}>
                  {this.state.avatarSource === '' ? (
                    <Image
                      style={styles.imageProfile}
                      source={{
                        uri: image,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: this.state.avatarSource}}
                      style={styles.imageProfile}
                    />
                  )}
                  <Icon name="camera" style={styles.iconProfile} />
                </TouchableOpacity>
                <View style={styles.viewModalButt}>
                  <View style={styles.viewModalButt1}>
                    <Button
                      rounded
                      style={styles.buttonX}
                      onPress={() =>
                        this.setState({
                          modalEdit: false,
                          name: '',
                          id: '',
                          identity_number: '',
                          phone_number: '',
                          isEmpName: true,
                          isEmpIdCard: true,
                          isEmpPhoneNum: true,
                          avatarSource: '',
                        })
                      }
                      disabled={false}>
                      <Text style={styles.buttonTextX}> Cancel </Text>
                    </Button>
                    <Button
                      rounded
                      style={styles.buttonY}
                      onPress={() => this.editCustomer()}
                      disabled={this.check(
                        this.state.isEmpName,
                        this.state.isEmpIdCard,
                        this.state.isEmpPhoneNum,
                      )}>
                      <Text style={styles.buttonTextY}> Edit </Text>
                    </Button>
                  </View>
                  <View style={styles.viewDel}>
                    <Button
                      rounded
                      style={styles.buttonDel}
                      onPress={() => this.delCustomer()}>
                      <Text style={styles.buttonTextDel}> Delete </Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    custLocal: state.cust,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleGetCustomer: tok => dispatch(actionCustomer.handleGetCust(tok)),
    handleAddCustomer: (tok, name, idCard, phoNum, image) =>
      dispatch(actionCustomer.handleAddCust(tok, name, idCard, phoNum, image)),
    handleEditCustomer: (tok, id, name, idCard, PhoNum, image) =>
      dispatch(
        actionCustomer.handleUpdateCust(tok, id, name, idCard, PhoNum, image),
      ),
    handleDeleteCustomer: (tok, id) =>
      dispatch(actionCustomer.handleDeleteCust(tok, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);

const styles = StyleSheet.create({
  modalItem: {
    alignItems: 'flex-start',
    fontSize: height * 0.045,
    marginTop: height * 0.01,
    fontStyle: 'italic',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  fab: {
    backgroundColor: '#7f8fa6',
    width: height * 0.08,
    height: height * 0.08,
    borderRadius: height * 0.04,
    position: 'absolute',
  },
  view: {
    // marginVertical: height * 0.015,
    flexDirection: 'row',
    height: height * 0.07,
    width: width * 0.93,
    borderRadius: width * 0.01,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  searchBar: {
    marginStart: width * 0.01,
    fontSize: height * 0.035,
    color: 'white',
  },
  search: {
    marginEnd: width * 0.01,
    fontSize: height * 0.045,
    color: '#2f3640',
    // marginTop: height * 0.01,
  },
  listCust: {
    height: height * 0.13,
    width: height * 0.13,
    borderWidth: 1,
    borderColor: '#f1f2f6',
    borderRadius: height * 0.065,
  },
  listDetailCust: {
    marginStart: width * 0.01,
    justifyContent: 'center',
    backgroundColor: '#2f3640',
  },
  title: {
    fontSize: height * 0.023,
    marginStart: width * 0.04,
    color: 'white',
  },
  row: {
    alignSelf: 'center',
    backgroundColor: '#2f3640',
    flexDirection: 'row',
    borderRadius: width * 0.025,
    height: height * 0.15,
    width: width * 0.94,
    paddingHorizontal: width * 0.02,
    marginTop: height * 0.005,
  },
  header: {
    backgroundColor: '#718093',
    height: height * 0.09,
    justifyContent: 'center',
  },
  titleHeader: {
    alignSelf: 'center',
    color: 'white',
    fontSize: height * 0.04,
  },
  iconProfile: {
    marginLeft: width * 0.17,
    marginTop: -height * 0.035,
    fontSize: height * 0.05,
    color: 'grey',
    alignSelf: 'center',
  },
  imageProfile: {
    borderWidth: 2,
    borderColor: 'silver',
    alignSelf: 'center',
    width: height * 0.15,
    height: height * 0.15,
    marginTop: height * 0.025,
    borderRadius: height * 0.075,
  },
  fabIcon: {
    fontSize: height * 0.04,
    color: 'white',
  },
  mainView: {
    backgroundColor: '#dfe4ea',
    flex: 1,
  },
  buttonX: {
    marginTop: height * 0.02,
    justifyContent: 'center',
    marginHorizontal: width * 0.02,
    width: width * 0.35,
    height: height * 0.06,
    backgroundColor: '#f1f2f6',
  },
  buttonY: {
    marginTop: height * 0.02,
    justifyContent: 'center',
    marginHorizontal: width * 0.02,
    width: width * 0.35,
    height: height * 0.06,
  },
  buttonDel: {
    marginTop: height * 0.02,
    justifyContent: 'center',
    marginHorizontal: width * 0.02,
    width: width * 0.35,
    height: height * 0.06,
    backgroundColor: '#eb2f06',
  },
  buttonTextX: {
    fontSize: height * 0.035,
    color: 'black',
  },
  buttonTextY: {
    fontSize: height * 0.035,
    color: 'white',
  },
  buttonTextDel: {
    fontSize: height * 0.035,
    color: 'white',
  },
  modalBg: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: width * 0.9,
    height: null,
    borderRadius: width * 0.015,
  },
  subViewInput: {
    marginTop: height * 0.01,
    marginHorizontal: width * 0.025,
    justifyContent: 'center',
  },
  subViewTitle: {
    marginTop: height * 0.04,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  titleView: {
    fontSize: height * 0.06,
    fontWeight: 'bold',
  },
  inputStyle: {
    borderColor: 'silver',
    borderWidth: 2,
    borderRadius: width * 0.015,
    fontSize: height * 0.035,
    height: height * 0.06,
    paddingLeft: width * 0.02,
    alignContent: 'center',
    width: width * 0.8,
  },
  dimBg: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    height,
    width,
    justifyContent: 'center',
  },
  viewModalButt1: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewModalButt: {
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  viewModalButt2: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: height * 0.02,
  },
  imgBg: {
    flex: 1,
    height,
    width,
  },
});
