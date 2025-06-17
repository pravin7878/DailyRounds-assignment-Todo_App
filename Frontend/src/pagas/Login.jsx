import { loginUser } from "../app/actions/user";
import {
    Button,
    Center,
    Field,
    Fieldset,
    For,
    HStack,
    Input,
    NativeSelect,
    Stack,
    Text
  } from "@chakra-ui/react"
  import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"

  const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);


  
  
    const [data,setData] = useState({
      email : "",
      password : ""
    })
   
    
const handelChange = (e)=>{
const {name,value} = e.target
setData({...data, [name] : value})
}

const handelSubmit = async()=>{
  const result = await dispatch(loginUser(data)); // Dispatch login action
    console.log(result);
    
  if (result.payload?.accessToken) {

      localStorage.setItem("user", JSON.stringify({ name : result.payload?.name  ,token : result.payload?.accessToken})); 

      // Clear form data
      setData({
        email: "",
        password: "",
      });

      // Navigate to home page
      navigate("/");
    }
  
}
    return (
    <Center py={5}>
      <Fieldset.Root  size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>Login Now</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide your details below.
          </Fieldset.HelperText>
        </Stack>
        {error && <Text size={"sm"} color="red.500">{error?.message}</Text>}
        {user && <p>Welcome, {user.name}!</p>}
        <Fieldset.Content >
          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Input value={data.email} onChange={handelChange} name="email" type="email" />
          </Field.Root>
  
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input value={data.password} onChange={handelChange} name="password" type="text" />
          </Field.Root>
        </Fieldset.Content>
  
  
        <Button
          onClick={handelSubmit}
          type="submit"
          alignSelf="flex-start"
          loading={loading}
        >
          SingIn
        </Button>
        <HStack>
        <Fieldset.HelperText>
            If you dontn't have a account , you can
          </Fieldset.HelperText>
          <Text _hover={{textDecoration : "underline"}}><Link  to={"/singup"}>SingUp</Link></Text>
        </HStack>
        
      </Fieldset.Root>
      </Center>
    )
  }

  export default Login
  