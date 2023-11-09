import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { objectTraps as asiox } from "immer/src/core/proxy";
import * as board from "node/repl";

export function BoardList() {
  const [boardList, setBoardList] = useState(null);

  useEffect(() => {
    asiox
      .get("/api/board/list")
      .then((response) => setBoardList(response.data));
  }, []);
  return (
    <Box>
      <h1>게시물 목록</h1>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>title</Th>
              <Th>by</Th>
              <Th>at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList || <Spinner />}
            {boardList &&
              boardList.map((board) => (
                <Tr>
                  <Td>{board.id}</Td>
                  <Td>{board.title}</Td>
                  <Td>{board.writer}</Td>
                  <Td>{board.inserted}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
