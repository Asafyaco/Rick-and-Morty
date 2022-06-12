import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import DataView from "./containers/DataGrid/DataGrid";

function App() {
  return (
    <div className="App">
      <Header />
      <Search />
      <DataView />
    </div>
  );
}

export default App;
