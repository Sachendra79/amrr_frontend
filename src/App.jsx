import { Route, Routes } from "react-router-dom";
import Navbar from "../src/Components/Navbar";
import ViewItem from "./Pages/ViewItem";
import AddItem from "./Pages/AddItem";
const App = () => {
  return (
    <div className="">
      <div >
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<ViewItem />} />
        <Route path="/AddItem" element={<AddItem />} />
      </Routes>
    </div>
  );
};

export default App;
