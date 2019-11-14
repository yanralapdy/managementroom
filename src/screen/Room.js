/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
  AsyncStorage,
  FlatList,
  KeyboardAvoidingView,
  ImageBackground,
  Alert,
} from 'react-native';
import {Header, Body, Title, Button, Input, Item} from 'native-base';

import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as actionRoom from './../redux/actions/actionRooms';
import * as actionCheckin from './../redux/actions/actionOrders';

const {height, width} = Dimensions.get('window');
// console.log(webtoons);
class Room extends Component {
  state = {
    id: '',
    name: '',
    modalAdd: false,
    modalEdit: false,
    isEmpty: true,
    state: false,
    spinner: this.props.roomsLocal.isLoading,
  };
  // async componentDidMount() {
  //   const tok = await AsyncStorage.getItem('token');
  //   await this.props.handleGetRooms(tok);
  // }
  listAll(item) {
    return (
      <TouchableOpacity
        style={styles.allList}
        onPress={() => this.showEdit(item)}>
        <Text style={styles.text}> {item.name} </Text>
      </TouchableOpacity>
    );
  }
  checkInput(input) {
    if (input === '') {
      this.setState({isEmpty: true});
    } else {
      this.setState({isEmpty: false, name: input});
    }
    this.setState({name: input});
  }
  async showEdit(item) {
    this.setState({
      id: item.id,
      name: item.name,
      modalEdit: true,
      isEmpty: true,
    });
  }
  async delRoom() {
    this.setState({spinner: true});
    const {id} = this.state;
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleDeleteRoom(tok, id);
    this.getData();
    this.setState({
      modalEdit: false,
      avatarSource: '',
      spinner: this.props.roomsLocal.isLoading,
    });
  }
  async editRoom() {
    this.setState({spinner: true});
    const id = this.state.id;
    const name = this.state.name;
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleEditRoom(tok, name, id);
    console.log(id, tok, name);
    this.getData();
    this.setState({modalEdit: false, spinner: this.props.roomsLocal.isLoading});
  }
  async addRoom() {
    this.setState({spinner: true});
    const name = this.state.name;
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleAddRoom(tok, name);
    console.log(tok, name);
    this.getData();
    this.setState({modalAdd: false, spinner: this.props.roomsLocal.isLoading});
  }
  getData = async () => {
    const tok = await AsyncStorage.getItem('token');
    await this.props.handleGetRooms(tok);
    await this.props.handleGetCheckin(tok);
  };
  render() {
    console.disableYellowBox = true;
    const {rooms} = this.props.roomsLocal;
    const {name} = this.state;
    return (
      <View style={styles.mainView}>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
        <View style={{}}>
          <Header style={styles.header}>
            <Body>
              <Title style={styles.titleHeader}> Rooms </Title>
            </Body>
          </Header>
        </View>
        <ImageBackground
          style={styles.imgBg}
          source={{
            uri:
              'https://ak3.picdn.net/shutterstock/videos/21658243/thumb/1.jpg',
          }}>
          <View style={{flex: 9}}>
            <FlatList
              numColumns={3}
              style={styles.flatList}
              data={rooms}
              renderItem={({item}) => this.listAll(item)}
              keyExtractor={item => item.title}
            />
          </View>
          <View style={{flex: 1, marginBottom: height * 0.01}}>
            <TouchableOpacity
              style={styles.view}
              onPress={() => this.setState({modalAdd: true, isEmpty: true})}>
              <Icon name="plus" size={50} color={'white'} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/* Modal that is used to Add a New Room */}
        <Modal
          visible={this.state.modalAdd}
          transparent={true}
          animationType={'fade'}>
          <KeyboardAvoidingView style={styles.dimBg} behavior="padding" enabled>
            <View style={styles.modalBg}>
              <View style={styles.subViewTitle}>
                <Text style={styles.titleView}> Add New Room </Text>
              </View>
              <View style={styles.subViewInput}>
                <View>
                  <Text style={styles.modalText}> Room Name :*</Text>
                  <Item>
                    <Input
                      onChangeText={input => this.checkInput(input)}
                      style={styles.inputStyle}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      placeholder="Input Room Name"
                    />
                  </Item>
                </View>
                <View style={styles.viewModalButt2}>
                  <Button
                    rounded
                    style={styles.buttonX}
                    onPress={() =>
                      this.setState({modalAdd: false, name: '', id: ''})
                    }
                    disabled={false}>
                    <Text style={styles.buttonTextX}> Cancel </Text>
                  </Button>
                  <Button
                    rounded
                    style={styles.buttonY}
                    onPress={() => this.addRoom()}
                    disabled={this.state.isEmpty}>
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
                <Text style={styles.titleView}> Edit Room </Text>
              </View>
              <View style={styles.subViewInput}>
                <Text style={styles.modalText}> Room Name :*</Text>
                <Item>
                  <Input
                    onChangeText={input => this.checkInput(input)}
                    value={name}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    keyboardType="name-phone-pad"
                  />
                </Item>
                <View style={styles.viewModalButt}>
                  <View style={styles.viewModalButt1}>
                    <Button
                      rounded
                      style={styles.buttonX}
                      onPress={() =>
                        this.setState({modalEdit: false, name: '', id: ''})
                      }
                      disabled={false}>
                      <Text style={styles.buttonTextX}> Cancel </Text>
                    </Button>
                    <Button
                      rounded
                      style={styles.buttonY}
                      onPress={() => this.editRoom()}
                      disabled={this.state.isEmpty}>
                      <Text style={styles.buttonTextY}> Edit </Text>
                    </Button>
                  </View>
                  <View style={styles.viewDel}>
                    <Button
                      rounded
                      style={styles.buttonDel}
                      onPress={() => this.delRoom()}>
                      <Text style={styles.buttonTextDel}> Delete </Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    roomsLocal: state.rooms,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleEditRoom: (tok, name, id) =>
      dispatch(actionRoom.handleUpdateRooms(tok, name, id)),
    handleAddRoom: (tok, name) =>
      dispatch(actionRoom.handleAddRooms(tok, name)),
    handleGetRooms: tok => dispatch(actionRoom.handleGetRooms(tok)),
    handleGetCheckin: tok => dispatch(actionCheckin.handleGetCheckins(tok)),
    handleDeleteRoom: (tok, id) =>
      dispatch(actionRoom.handleDeleteRoom(tok, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);

const styles = StyleSheet.create({
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
  view: {
    flex: 1,
    marginHorizontal: width * 0.02,
    backgroundColor: '#2f3542',
    borderColor: '#2f3542',
    borderWidth: 3,
    borderRadius: width * 0.015,
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.085,
  },
  text: {
    color: '#ecf0f1',
    alignSelf: 'center',
    fontSize: height * 0.045,
  },
  allList: {
    backgroundColor: '#2f3542',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: width * 0.015,
    marginHorizontal: width * 0.015,
    borderColor: '#f1f2f6',
    borderWidth: 3,
    borderRadius: width * 0.015,
    width: height * 0.14,
    height: height * 0.14,
  },
  flatList: {
    marginTop: height * 0.015,
    alignSelf: 'center',
  },
  header: {
    backgroundColor: '#718093',
    height: height * 0.09,
    justifyContent: 'center',
  },
  mainView: {
    backgroundColor: '#dfe4ea',
    flex: 1,
  },
  titleHeader: {
    alignSelf: 'center',
    color: 'white',
    fontSize: height * 0.04,
  },
  subViewInput: {
    marginTop: height * 0.04,
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
    // backgroundColor: '#dfe4ea',
  },
  modalText: {
    alignItems: 'flex-start',
    fontSize: height * 0.045,
    fontStyle: 'italic',
  },
  dimBg: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    height,
    width,
    justifyContent: 'center',
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
  },
});
