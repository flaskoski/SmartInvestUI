import './App.css';
import Assets from './assets/Assets';
import ChartComponent from './charts/ChartComponent';
import Transactions from './transactions/Transactions';

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <Assets />
      <Transactions/>
    </div>
  );
}

export default App;
 