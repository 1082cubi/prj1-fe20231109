import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input, useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

export function MemberSignup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [idAvalable, setIdAvalable] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const toast = useToast();
  let submitAvailable = true;

  if(emailAvailable) {
    
  }
  if (!idAvalable) {
    submitAvailable = false;
  }

  if (password != passwordCheck) {
    submitAvailable = false;
  }

  if (password.length === 0) {
    submitAvailable = false;
  }

  function handleSubmit() {
    axios
      .post("/api/member/signup", {
        id,
        password,
        email,
      })
      .then(() => console.log("good"))
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
  }

  function handleIdCheck() {
    const searchParam = new URLSearchParams();
    searchParam.set("id", id);

    axios
      .get("/api/member/check?" + searchParam.toString())
      .then(() => {
        setIdAvalable(false);
        toast({
          description: "이미 사용중인 ID입니다",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIdAvalable(true);
          toast({
            description: "사용 가능한 아이디입니다",
            status:"success",
          });
        }
      });
  }

  function handleEmaliCheck() {
    const params =new URLSearchParams();
    params.set("email",email);
    
    axios.get("/api/member/check?" + params)
      .then(() => {
        toast({
          description: "이미 사용중인 email입니다",
          status: "warning"
        })
      })
      .catch(error => {
        setEmailAvailable(true);
        toast({
          description: "사용 가능한 email입니다",
          status: "success",
        });

      })
  }

  return (
    <Box>
      <h1>회원 가입</h1>
      <FormControl isInvalid={!idAvalable}>
        <FormLabel>id</FormLabel>
        <Flex>
          <Input
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setIdAvalable(false);
            }}
          />
          <Button onClick={handleIdCheck}>중복확인</Button>
        </Flex>
        <FormErrorMessage>ID 중복체크를 해주세요</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={password.length === 0}>
        <FormLabel>password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormErrorMessage>똑바로 입력 부탁드릴게요.</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={password != passwordCheck}>
        <FormLabel>password 확인</FormLabel>
        <Input
          type="password"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <FormErrorMessage>암호가 다릅니다.</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!emailAvailable}>
        <FormLabel>email</FormLabel>
        <Flex>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmailAvailable(false);
            setEmail(e.target.value)
          }}
        />
        <Button onClick={handleEmaliCheck}>중복체크</Button>
        </Flex>
      </FormControl>
      <Button
        isDisabled={!submitAvailable}
        onClick={handleSubmit}
        colorScheme="blue"
      >
        가입
      </Button>
    </Box>
  );
}