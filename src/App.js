import './App.css';
import Assets from './tables/assets/Assets';
// import { convertPortfolioData } from './BatchOperations/SavePortfolio';
import Transactions from './tables/transactions/Transactions';
import MainMenu from './MainMenu';
import ChartComponent from './charts/ChartComponent';

function App() {
    // convertPortfolioData()
    return (
    <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <MainMenu >
            <div key="Assets/Transactions">
                <Assets />
                <Transactions/>
                <ChartComponent/>
            </div>
            <div key="Get Assets Return"></div>
            <div key="Get Portfolio Return"></div>
            <div key="Annual Report"></div>
        </MainMenu>
        
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
