// THIS IS THE PAGE WHICH IS COMBING ALL THE COMPONENTS OF THE API
import { Routes, Route } from "react-router-dom";
import Axios from "axios";
import "./App.css";
// HERE I IMPORTED BOOTSTRAP FROM NODE MODULES BECAUSE I INSTALLED BOOTSTRAP
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
// ALWAYS START THE NAME OF THE CUSTOM FILE YOU ARE IMPORTING WITH CAPITAL LETTER
import { Head } from "./components/Head";
import { Home } from "./components/Home";
import { Add } from "./components/Add";
import { Update } from "./components/Update";
import { View } from "./components/View";


function App() {
  return (
    <>
      <Head />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </>
  );
}

export default App;
