import React, { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Form2 } from "./components/Form2";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  const [page, setPage] = useState(false);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/step2" element={<Form2 />} />
        </Routes>
        {/* <Form />
        <Form2 /> */}
      </div>

    </Router>

  );
}

export default App