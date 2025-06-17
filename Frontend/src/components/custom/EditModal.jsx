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
    const [updatedTask, setUpdatedTask] = useState(task);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedTask({ ...updatedTask, [name]: value });
    };
  
    const handleSave = () => {
      onSave(updatedTask);
      onClose();
    };
  
    return (
    //   <Modal isOpen={isOpen} onClose={onClose}>
    //     <ModalOverlay />
    //     <ModalContent>
    //       <ModalHeader>Edit Task</ModalHeader>
    //       <ModalCloseButton />
    //       <ModalBody>
    //         <Input
    //           name="title"
    //           value={updatedTask.title}
    //           onChange={handleChange}
    //           placeholder="Title"
    //           mb={4}
    //         />
    //         <Input
    //           name="description"
    //           value={updatedTask.description}
    //           onChange={handleChange}
    //           placeholder="Description"
    //         />
    //       </ModalBody>
    //       <ModalFooter>
    //         <Button colorScheme="blue" mr={3} onClick={handleSave}>
    //           Save
    //         </Button>
    //         <Button variant="ghost" onClick={onClose}>
    //           Cancel
    //         </Button>
    //       </ModalFooter>
    //     </ModalContent>
    //   </Modal>

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

  