import './App.css';
import Assets from './tables/assets/Assets';
// import { convertPortfolioData } from './BatchOperations/SavePortfolio';
import Transactions from './tables/transactions/Transactions';
import MainMenu from './MainMenu';
import ChartComponent from './charts/ChartComponent';
import AnnualReport from './AnnualReport';
import {GetAssetReturn, GetPortfolioReturn, getPortfolioReturn} from './reports/GetReports'

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
            <GetAssetReturn key="Get Assets Return" />
            <GetPortfolioReturn key="Get Portfolio Return" />
            <AnnualReport key="Annual Report"></AnnualReport>
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
