import "./App.css";

import { Routes, Route } from "react-router-dom";
import { routes } from "../routes/routes"
// import AnimationProvider from "./animation/AnimationProvider";


export default function App() {
  return (
    <>
      <Routes>
        {routes.map(route => (
          <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
          />
        ))}
      </Routes>
      {/* <AnimationProvider/> */}
    </>
    
  );
}





