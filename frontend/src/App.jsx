import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import MessageDetailPage from "./pages/MessageDetailPage";

function App() {
  return (
    <div
      className="h-full w-full relative "
      // data-theme="forest"
    >
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        {/* Dynamic Route path with id for MessageDetailPage */}
        <Route path="/message/:id" element={<MessageDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
