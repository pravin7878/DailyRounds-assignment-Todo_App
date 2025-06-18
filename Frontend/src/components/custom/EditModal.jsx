import React, { useState } from "react"
  import {
    Button,
    CloseButton,
    Dialog,
    For,
    HStack,
    Input,
    Portal,
  } from "@chakra-ui/react"
  
  export const EditTaskModal = ({ task, onClose, onSave,children }) => {
    const [updatedTask, setUpdatedTask] = useState({
      ...task,
      tags: Array.isArray(task.tags) ? task.tags.join(', ') : (task.tags || '')
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedTask({ ...updatedTask, [name]: value });
    };
  
    const handleSave = () => {
      // Convert tags string to array before saving
      const submitTask = {
        ...updatedTask,
        tags: updatedTask.tags
          ? updatedTask.tags.split(',').map(t => t.trim()).filter(Boolean)
          : []
      };
      onSave(submitTask);
      onClose();
    };
  
    return (
    
    <Dialog.Root
            placement={"center"}
            motionPreset="slide-in-bottom"
          >
            <Dialog.Trigger asChild>
              {children}
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Edit Task</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                  <Input
              name="title"
              value={updatedTask.title}
              onChange={handleChange}
              placeholder="Title"
              mb={4}
            />
            <Input
              name="description"
              value={updatedTask.description}
              onChange={handleChange}
              placeholder="Description"
            />

            <Input
              name="tags"
              value={updatedTask.tags}
              onChange={handleChange}
              placeholder="Tags (comma separated)"
              mt={4}
            />

            
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={handleSave}>Save</Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
    );
  };

  