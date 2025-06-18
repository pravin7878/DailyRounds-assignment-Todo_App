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
  const [errors, setErrors] = useState({});

console.log(useSelector((state) => state.tasks))
  const [taskData, setTaskData] = useState({
    title: "",
    priority: "low",
    description: "",
    tags: ""
  });

  const { title, priority, description, tags } = taskData;
  // Validate form fields
const validate = () => {
    const newErrors = {};
    if (!taskData.title.trim()) newErrors.title = "Title is required";
    if (!taskData.description.trim()) newErrors.description = "Description is required";
return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
        e.preventDefault();

    const validateErrors = validate();
    console.log(validateErrors)
    setErrors(validateErrors);

    if(errors && Object.keys(validateErrors).length === 0) {
    const submitData = {
      ...taskData,
      tags: taskData.tags
        ? taskData.tags.split(',').map(t => t.trim()).filter(Boolean)
        : []
    };
    const result = await  dispatch(addTask(submitData));

    if (result.meta.requestStatus === "fulfilled") {
      toaster.create({
        title: "Task added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/");
    }
  }
  };

  return (
    <Center w={{ base: "full", md: "80%" }} m={"auto"}>
      <Fieldset.Root size="md" as="form" onSubmit={handleSubmit}>
        <Fieldset.Legend>Task details</Fieldset.Legend>

        {error && <Text color="red.500">{error?.message}</Text>}

        {errors &&   Object.keys(errors).length > 0 && (
          <Text color="red.500" mb={4}>
            {Object.values(errors).map((err, index) => (
              <div key={index}>{err}</div>
            ))}
          </Text>
        )}  
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

        <Field.Root>
          <Field.Label>Tags (comma separated)</Field.Label>
          <Input
            name="tags"
            value={taskData.tags}
            onChange={handleChange}
            placeholder="e.g. work, urgent, personal"
          />
        </Field.Root>

        <Button
          type="submit"
          alignSelf="flex-start"
          loading={loading}
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