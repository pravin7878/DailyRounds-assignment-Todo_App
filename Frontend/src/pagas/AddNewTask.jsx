import React, { useState } from "react";
import {
  Button,
  Center,
  Field,
  Fieldset,
  Input,
  NativeSelect,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster"
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../app/actions/task";
import { useNavigate } from "react-router-dom";

const AddNewTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.tasks);
  

  const [taskData, setTaskData] = useState({
    title: "",
    priority: "low",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(taskData);
    
    e.preventDefault();
    const result = await dispatch(addTask(taskData));

    if (result.meta.requestStatus === "fulfilled") {
      toaster.create({
        title: "Task added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/");
    }
  };

  return (
    <Center w={{ base: "full", md: "80%" }} m={"auto"}>
      <Fieldset.Root size="md" as="form" onSubmit={handleSubmit}>
        <Fieldset.Legend>Task details</Fieldset.Legend>

        {error && <Text color="red.500">{error}</Text>}

        <Field.Root>
          <Field.Label>Title</Field.Label>
          <Input name="title" value={taskData.title} onChange={handleChange} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Priority</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
            >
              {["low", "medium", "high"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Field.Root>
          <Field.Label>Description</Field.Label>
          <Textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
          />
        </Field.Root>

        <Button
          type="submit"
          alignSelf="flex-start"
          isLoading={loading}
          loadingText="Adding..."
          onClick={handleSubmit}
        >
          ADD TASK
        </Button>
      </Fieldset.Root>
    </Center>
  );
};

export default AddNewTask;