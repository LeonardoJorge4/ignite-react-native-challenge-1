import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit.png';
import cancelIcon from '../assets/icons/cancel.png';

import Icon from 'react-native-vector-icons/Feather';

interface TaskItemProps {
  id: number;
  title: string;
  done: boolean;
  index: number;
  taskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
}

export function TaskItem({ 
  id,
  title,
  done,
  index,
  taskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsBeingEdited(true)
  }

  function handleCancelEditing() {
    setIsBeingEdited(false)
    setTaskTitle(title)
  }

  function handleSubmitEditing() {
    editTask(id, taskTitle)
    setIsBeingEdited(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeingEdited) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isBeingEdited])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => taskDone(id)}
        disabled={isBeingEdited}
      >
        <View 
          testID={`marker-${index}`}
          style={done ? styles.taskMarkerDone : styles.taskMarker}
        >
          { done && (
            <Icon
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>

        <TextInput
          value={taskTitle}
          ref={textInputRef}
          editable={isBeingEdited}
          onChangeText={setTaskTitle}
          onSubmitEditing={handleSubmitEditing}
          style={done ? styles.taskTextDone : styles.taskText}
        />
      </TouchableOpacity>

      
      <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 24}}>
        {
          isBeingEdited
          ? <TouchableOpacity
              onPress={handleCancelEditing}
            >
              <Image source={cancelIcon} />
            </TouchableOpacity>
          : <TouchableOpacity
              onPress={handleStartEditing}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
        }

        <View style={styles.iconDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => removeTask(id)}
          disabled={isBeingEdited}
        >
          <Image
            source={trashIcon}
            style={{ opacity: isBeingEdited ? 0.2 : 1 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconDivider: { 
    width: 1, 
    height: 24,
    marginHorizontal: 12,
    backgroundColor: "rgba(196, 196, 196, 0.24)"
  }
})