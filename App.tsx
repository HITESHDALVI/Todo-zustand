/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ClearIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import TitleLogo from 'react-native-vector-icons/Entypo';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import useGlobalStore from './src/store';
import AddModal from './src/screen/AddModal';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const {categories, removeTodo} = useGlobalStore();

  const [visible, setVisible] = useState(false);
  return (
    <>
      <View style={[styles.mainContainer, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View>
          <View style={[styles.titleWrapper]}>
            <TitleLogo
              name="list"
              size={25}
              color="#F76C6A"
              style={[{marginRight: 4}]}
            />
            <Text style={[styles.appName, backgroundStyle]}>Just To Do</Text>
          </View>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={[backgroundStyle]}
          contentContainerStyle={{
            marginVertical: 10,
            paddingTop: 25,
            // flex: 1,
            flexGrow: 1,
            paddingBottom: '10%',
          }}>
          {categories?.map(item => (
            <View style={[styles.note]} key={item?.id}>
              {console.log(JSON.stringify(item))}
              <Text style={[{fontSize: 16, fontWeight: '500'}]}>
                {item?.title}
              </Text>
              <Text style={{fontSize: 14, marginTop: 10}}>
                {item?.description}
              </Text>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={{marginTop: 10, fontSize: 12}}>
                  Created at {item?.time}{' '}
                  <Icon
                    name="clock"
                    size={14}
                    color="#FFFFFF"
                    style={[{marginLeft: 12}]}
                  />{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    removeTodo(item?.id);
                  }}>
                  <ClearIcon
                    name="sticker-remove-outline"
                    size={25}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
          style={[styles.add]}>
          <Icon name="plus" size={35} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <AddModal
        visible={visible}
        close={() => {
          setVisible(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: '2.5%',
    paddingVertical: '2%',
  },
  appName: {
    color: '#F76C6A',
    fontSize: 19,
    fontWeight: '500',
    letterSpacing: 0.65,
  },
  add: {
    backgroundColor: '#F76C6A',
    height: 62,
    width: 62,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  note: {
    backgroundColor: '#FF8786',
    width: '100%',
    height: 125,
    borderRadius: 10,
    padding: '4%',
    marginVertical: '2%',
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '30%',
  },
});

export default App;
