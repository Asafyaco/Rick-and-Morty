import "./App.scss";
import Header from "./components/Header/Header";
import DataView from "./containers/DataGrid/DataGrid";

function App() {
  return (
    <div className="App">
      <Header />
      <DataView />
    </div>
  );
}

export default App;
