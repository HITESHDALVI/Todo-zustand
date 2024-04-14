import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CloseIcon from 'react-native-vector-icons/Ionicons';
import useGlobalStore from '../store';

type Props = {visible: boolean; close: () => void};
type initialStateType = {
  title: string;
  description: string;
  title_error: boolean;
  description_error: boolean;
};
const initialState: initialStateType = {
  title: '',
  description: '',
  title_error: false,
  description_error: false,
};
const AddModal = (props: Props) => {
  const {setCategories, categories} = useGlobalStore();
  const [todo, setTodo] = useState<initialStateType>(initialState);

  const handleSubmit = () => {
    if (todo.title && todo.description) {
      setCategories({
        ...todo,
        id: categories[categories.length - 1]?.id
          ? categories[categories.length - 1]?.id + 1
          : 1,
      });
      setTodo(initialState);
      props?.close();
    } else {
      setTodo({
        ...todo,
        title_error: todo.title ? false : true,
        description_error: todo.description ? false : true,
      });
    }
  };
  const handleTextChange = (key: string, value: string) => {
    setTodo({...todo, [key]: value});
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props?.visible}
      onRequestClose={() => {
        props?.close();
      }}>
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={() => props?.close()}>
        {/* <View > */}
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={[styles.close]}>
              <Text style={styles.modalTitle}>What's In Your mind!</Text>
              <TouchableOpacity onPress={() => props?.close()}>
                <CloseIcon name="close" color={'#7e7e7e'} size={30} />
              </TouchableOpacity>
            </View>
            <View style={[styles.contentWrapper]}>
              <TextInput
                placeholder="Enter Title"
                placeholderTextColor={'lightgrey'}
                style={[styles.titleInput]}
                onChangeText={text => handleTextChange('title', text)}
              />
              {todo?.title_error && (
                <Text style={[styles.error]}>Title cannot be empty!</Text>
              )}
              <TextInput
                placeholder="Description"
                placeholderTextColor={'lightgrey'}
                style={[styles.titleInput, {marginTop: 35}]}
                onChangeText={text => handleTextChange('description', text)}
              />
              {todo?.description_error && (
                <Text style={[styles.error]}>Description cannot be empty!</Text>
              )}

              <TouchableOpacity style={[styles.button]} onPress={handleSubmit}>
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* </View> */}
      </TouchableOpacity>
    </Modal>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modalView: {
    // backgroundColor: '#D0E7FF',
    backgroundColor: '#F5F6FF',
    // height: 300,
    width: '90%',
    borderRadius: 25,
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  contentWrapper: {
    marginTop: 25,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: '#0E4A67',
    fontSize: 22,
    fontWeight: '500',
  },
  close: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleInput: {
    width: '100%',
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#6FCF97',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#0E4A67',
  },
  button: {
    backgroundColor: '#FE904B',
    width: 175,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 40,
    alignSelf: 'center',
  },
  error: {
    fontSize: 11,
    color: 'red',
    marginTop: 4,
  },
});
