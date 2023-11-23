import React from 'react';
import {createRoutesFromElements, Route} from "react/reuter-dom";
import {BoardWrite} from "./page/BoardWrite";
import {Boardlist} from "./page/Boardlist";
import {HomeLatout} from "./layout/HomeLatout";

const routes = createBrowerRouter(
    createRoutesFromElements(
        <Route path="/" element = {<HomeLatout />}>
          <Route index element={<Boardlist />} />
          <Route path="write" element={<BoardWrite />}/>
        </Route>
    )
)
function App(props) {
  return <RouterProvider reuter={routes}/>;


}


export default App;