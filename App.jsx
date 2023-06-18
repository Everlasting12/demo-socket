

import React, { useCallback, useEffect, useState } from 'react';
import
{
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native';
import useTodosStore from './src/store/todos.store';

import tw from 'twrnc';

function App()
{

  const todos = useTodosStore(state => state.todos);
  const addTodos = useTodosStore(state => state.addTodos);
  const getAllTodos = useTodosStore(state => state.getAllTodos);
  const todoCreatedEvent = useTodosStore(state => state.todoCreatedEvent);
  const [text, onChangeText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleSubmit = () =>
  {
    addTodos({ text })
    onChangeText("")
  }
  useEffect(() =>
  {
    getAllTodos()
    todoCreatedEvent()
  }, [])
  const onRefresh = () =>
  {
    setIsRefreshing(true);
    getAllTodos()
    setIsRefreshing(false)
  }
  return (
    <SafeAreaView style={styles.sectionContainer}>

      <View style={tw`flex-row gap-2 justify-between items-center`}>
        <TextInput
          style={tw`w-[80%] border-2 border-blue-500 rounded p-2 px-5`}
          onChangeText={onChangeText}
          value={text}
          placeholder='Your todos here...'
        />

        <TouchableNativeFeedback
          onPress={handleSubmit}
          background={TouchableNativeFeedback.Ripple(
            "gray",
            false,
          )}
        >
          <View style={tw`w-[20%] h-full flex-row items-center justify-center rounded bg-blue-500`}>
            <Text style={tw`text-white font-bold text-lg`}>Save</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      {/* FlatList */}

      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} />}
        keyExtractor={t => t._id}
        refreshing={isRefreshing} // Added pull to refesh state
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
}

const TodoItem = ({ todo }) => (
  <View style={tw`my-2 border-2 rounded-md border-blue-400`}>
    <Text style={tw`text-black p-2 text-base`}>{todo.text}</Text>
  </View>
)


const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
  },

});

export default App;

