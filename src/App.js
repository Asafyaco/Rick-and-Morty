import "./App.css";
import Header from "./components/Header/Header";
import DataView from "./containers/DataGrid/DataGrid";
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <DataView />
    </div>
  );
}

export default App;
