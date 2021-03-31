import './App.css';
import MainMenu from './MainMenu';
import {AccountBox, Assessment, TableChart, Update, TrendingUp} from '@material-ui/icons';
import AnnualReport from './reports/AnnualReport';
import GetAssetsReturn from './reports/GetAssetsReturn';
import GetPortfolioReturn from './reports/GetPortfolioReturn';
import Login from './common/login/Login';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import AssetsTransactions from './tables/AssetsTransactions';
import PortfolioPosition from './reports/PortfolioPosition';
import { withAuthenticator } from '@aws-amplify/ui-react';
configureCognito();

function App() {
    
    return (
    <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <MainMenu >
            <Login key="Profile" ><AccountBox/></Login>
            <AssetsTransactions key="Assets/Transactions"><Assessment/></AssetsTransactions>
            <GetAssetsReturn key="Update Assets Return"><Update/></GetAssetsReturn>
            <GetPortfolioReturn key="Get Portfolio Return"><TrendingUp/></GetPortfolioReturn> 
            <AnnualReport key="Annual Report"><TableChart/></AnnualReport>
            <PortfolioPosition key="Portfolio Position"><TableChart/></PortfolioPosition>
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

    

function configureCognito(){
    Amplify.configure({
        Auth: {
            // REQUIRED - Amazon Cognito Region
            region: process.env.REACT_APP_COGNITO_POOL_REGION,
            userPoolId: process.env.REACT_APP_COGNITO_POOL_ID,
            // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
            userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_ID,

            // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
            // mandatorySignIn: false,
            // OPTIONAL - Configuration for cookie storage
            // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
            // cookieStorage: {
            // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            //     domain: '.smartinvestapp.com',
            // // OPTIONAL - Cookie path
            //     path: '/',
            // // OPTIONAL - Cookie expiration in days
            //     expires: 365,
            // // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
            //     // sameSite: "strict" | "lax",
            // // OPTIONAL - Cookie secure flag
            // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            //     secure: true
            // },

            // OPTIONAL - customized storage object
            // storage: MyStorage,

            // // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
            // authenticationFlowType: 'USER_PASSWORD_AUTH',

            // // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
            // clientMetadata: { myCustomKey: 'myCustomValue' },

            // // OPTIONAL - Hosted UI configuration
            // oauth: {
            //     domain: 'your_cognito_domain',
            //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            //     redirectSignIn: 'http://localhost:3000/',
            //     redirectSignOut: 'http://localhost:3000/',
            //     responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
            // }
        }
    });

    // You can get the current config object
    const currentConfig = Auth.configure();
    console.log(currentConfig)
}

export default withAuthenticator(App);
