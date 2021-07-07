import React, {useState} from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Pressable, Keyboard } from 'react-native';
function AppBar() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>To-do list</Text>
    </View>
  )
}
function TodoCard(props) {
  return(
    <View style={styles.toDoCard}>
      <Text style={styles.toDoText}>{props.todo}</Text>
      <Text onPress={props.removeAction} style={styles.removeButton}>&#10006;</Text>
    </View>
  )
}
//Because we can't style the <Button/> component, I will add a button component
function Button(props){
  return(
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>ADD</Text>
    </Pressable>
  )
}
export default function App() {
  const [todo, setTodo] = useState('');
  const [items, setItems] = useState([]);
  const AddTodoItem = () => {
    if(todo !== '') {
      setItems([...items, {id: Math.random(), text: todo}]);
      setTodo('');
    }
    Keyboard.dismiss();
  };
  const RemoveItem = (id) => {
    const selectedItems = items.filter(todos => todos.id !== id);
    setItems(selectedItems);
  }
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.inputDiv}>
        <TextInput 
          placeholder="New to-do" 
          style={styles.textBox} 
          value={todo} 
          onChangeText={(text) => setTodo(text)}
        />
        <Button onPress={AddTodoItem} />
      </View>
      <ScrollView style="auto">
        {
          items.map((item, index) => 
            <TodoCard key={index} todo={item.text} removeAction={() => RemoveItem(item.id)}/>
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#00008B',
    padding: 20,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  inputDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    marginBottom: 20,
  },
  textBox: {
    width: 250,
    borderColor: '#00008B',
    borderWidth: 2,
    borderRadius: 15,
    fontSize: 18,
    padding: 10,
    marginEnd: 10,
  },
  button: {
    backgroundColor: '#0066FF',
    borderRadius: 5,
    padding: 5,
    width: 70,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  toDoCard: {
    borderWidth: 2,
    backgroundColor: '#72AEE6',
    width: 320,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toDoText: {
    marginLeft: 10,
    fontSize: 16,
    width: '80%',
  },
  removeButton: {
    marginLeft: 'auto',
    color: 'blue',
    fontSize: 20,
    marginBottom: 1,
    marginEnd: 10,
    width: '10%',
  },
});
