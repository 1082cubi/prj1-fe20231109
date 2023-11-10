import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { BoardList } from "./page/BoardList";
import { BoardWrite } from "./page/BoardWrite";
import { HomeLayout } from "./layout/HomeLayout";
import { BoardView } from "./page/BoardView";
import { BoardEdit } from "./page/BoardEdit";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route path="write" element={<BoardWrite />} />
      <Route index element={<BoardList />} />
      <Route path="board/:id" element={<BoardView />} />
      <Route path="edit/:id" element={<BoardEdit />}></Route>
    </Route>,
  ),
);
function App(props) {
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
