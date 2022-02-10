import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasTaskRegistered = tasks.find(task => task.title === newTaskTitle)
    
    if(hasTaskRegistered) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      )
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
  
      setTasks(oldState => [...oldState, data])
    }
  }

  function handleToggleTaskDone(id: number) {
    tasks.filter(task => {
      task.id === id
      ? task.done = !task.done
      : task
    })

    setTasks(oldState => [...oldState])
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Tem certeza que você deseja remover esse item?',
      '',
      [
        {
          text: "Sim",
          onPress: () => setTasks(oldState => oldState.filter(
            task => task.id !== id
          )),
        },
        {
          text: "Não",
        },
      ]
    )

  }

  function handleEditTask(id: number, taskNewTitle: string) {
    tasks.filter(task => {
      task.id === id
      ? task.title = taskNewTitle
      : task
    })

    setTasks(oldState => [...oldState])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
        taskDone={handleToggleTaskDone}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})