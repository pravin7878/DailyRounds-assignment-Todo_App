import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, updateTask } from '../app/actions/task';
import { Text, Button, VStack, HStack, Flex, SimpleGrid, IconButton,Checkbox, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LuDelete } from 'react-icons/lu';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { EditTaskModal } from '../components/custom/EditModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { isOpen, onOpen, onClose } = useDisclosure();
  

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEdit = () => {
    onOpen();
  };

  const toggleStatus = async (taskId,task) => {
const updatedTask = {...task , status : task?.status === "pending" ? "completed" : "pending"}
    const result = await dispatch(updateTask({ taskId, taskData: updatedTask }));
    if (result.meta.requestStatus === "fulfilled") {
      console.log("Task updated successfully");
    }
  };

  const handleSave = async (updatedTask) => {
    const result = await dispatch(updateTask({ taskId: updatedTask._id, taskData: updatedTask }));
    if (result.meta.requestStatus === "fulfilled") {
      console.log("Task updated successfully");
    }
  };

  const handleDelete = async (taskId) => {
    const result = await dispatch(deleteTask(taskId));
    if (result.meta.requestStatus === "fulfilled") {
      console.log("Task deleted successfully");
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Flex direction={"column"}>
      <HStack justify={"end"} align={"end"}>
        <Link to={"/task/add"}>
          <Button size={"sm"} variant={"solid"}>
            Add New
          </Button>
        </Link>
      </HStack>

      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Your Tasks
        </Text>
        <SimpleGrid py={5} columns={{ base: 1, sm: 2, md: 3 }} gap={5}>
          {tasks.map((task) => (
            <VStack key={task._id} border="1px solid #ccc" p={4} borderRadius="md" w="100%">
              <Text fontWeight="bold">{task.title}</Text>
              <Text>{task.description}</Text>
              <HStack>

              <IconButton variant={"ghost"} size="sm" onClick={() => handleEdit(task)}>
              <Checkbox.Root onChange={()=>toggleStatus(task._id,task)} checked={task?.status === "completed"}>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
    </Checkbox.Root>
                </IconButton>

              <EditTaskModal
          task={task}
          isOpen={isOpen}
          onClose={onClose}
          onSave={handleSave}
        >


<IconButton variant={"ghost"} size="sm" onClick={() => handleEdit(task)}>
                  <FaEdit />
                </IconButton>

        </EditTaskModal>
                
                <IconButton variant={"ghost"} size="sm" onClick={() => handleDelete(task._id)}>
                  <AiFillDelete />
                </IconButton>
              </HStack>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>

      
    </Flex>
  );
};

export default Dashboard;