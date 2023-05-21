import React from "react";
import ProductPage from "./Components/ProductTable";
import { Route,Routes } from "react-router-dom";
import ProductView from "./Components/views";

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<ProductPage />}></Route>
      <Route path="/view/:id" element={<ProductView />}></Route>
      </Routes>
    </div>
  );
}

export default App;
