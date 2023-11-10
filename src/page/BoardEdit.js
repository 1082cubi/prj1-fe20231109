import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { useImmer } from "use-immer";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function BoardEdit() {
  const [board, upadateBoard] = useImmer(null);
  // /edit/:id
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => upadateBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  function updateBoard(param) {}

  function handleSubmit() {
    // 저장 버튼 클릭시 저장
    //PUT
    axios
      .put("/api/board/edit", board)
      .them(() => console.log("잘됨"))
      .catch(() => console.log("잘안됨"))
      .final(() => console.log("끝"));
    console.log(board);
  }
  return (
    <Box>
      <h1>{id}번 글 수정</h1>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input
          value={board.title}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.title = e.target.value;
            })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Textarea
          value={board.content}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.title = e.target.value;
            })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input
          value={board.writer}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.title = e.target.value;
            })
          }
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSubmit}>
        저장
      </Button>
      <Button onClick={() => navigate(-1)}>취소</Button>
    </Box>
  );
}
