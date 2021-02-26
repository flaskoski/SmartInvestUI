import './App.css';
import Assets from './assets/Assets';
import ChartComponent from './charts/ChartComponent';
import Transactions from './transactions/Transactions';


function App() {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      <Assets />
      <Transactions/>
      {/* <CrudAddModal show={true} itemType="Asset" itemFields={[{
                name: "Code",
                type: "text",
                isRequired: true
            }
        ]} /> */}
    </>
  );
}

export default App;
 