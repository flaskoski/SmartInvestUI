# Smart Invest App

* Manage your assets and transactions
* Analyze assets performance and your investments against popular indicators

### Getting Started

Add the following variables to the env files:

* On the `.env` files:

1. API Keys
    1. REACT_APP_API_KEY_ALPHA - Your API key from [Alphavantage](www.alphavantage.co) as 
    1. REACT_APP_API_KEY_AWS - API Key generated for the API gateway
1. Lambdas endpoints
    1. REACT_APP_API_GET_CURRENT_QUOTE
    1. REACT_APP_API_GET_ASSET_RETURN 
    1. REACT_APP_API_GET_PORTFOLIO_RETURN
    1. REACT_APP_API_GET_TOTALS_PER_MONTH
    1. REACT_APP_API_GET_PORTFOLIO_POSITION
1. Server endpoints
    1. REACT_APP_BACKEND_ASSETS - load balancer endpoint for the assets
    1. REACT_APP_BACKEND_TRANSACTIONS - load balancer endpoint for the transactions
1. Cognito User Pool 
    1. REACT_APP_COGNITO_POOL_REGION
    1. REACT_APP_COGNITO_POOL_ID
    1. REACT_APP_COGNITO_APP_ID 

### Services/Integrations

* AWS S3
* AWS Cognito
* AWS Cloudfront
* AWS API Gateway
* AWS ALB
* AWS SSM Parameter Store
* [AWS Amplify](https://docs.amplify.aws/)
* [Transactions App](https://github.com/flaskoski/Transactions)
* [React Stockcharts](http://rrag.github.io/react-stockcharts/)
* Alphavantage APIs

### Images

* Assets/Transactions Management

![Main screen](https://github.com/flaskoski/SmartInvestUI/blob/master/images/assets-transactions.PNG)


* Portfolio historical return compared to any other asset

![Portfolio return](https://github.com/flaskoski/SmartInvestUI/blob/master/images/portfolio-return.PNG))


* Login/Logout page (AWS Cognito)

![Login page](https://github.com/flaskoski/SmartInvestUI/blob/master/images/profile.PNG))


* Summarized table of sales and profits per asset type (for federal tax filing purposes)

![Annual Sales/Profit Report](https://github.com/flaskoski/SmartInvestUI/blob/master/images/annual.PNG))


* Portfolio situation by the end of the year (for federal tax filing purposes)

![Portfolio position](https://github.com/flaskoski/SmartInvestUI/blob/master/images/position.PNG))


* Full Application Architecture Diagram

![Full architecture diagram](https://github.com/flaskoski/SmartInvestUI/blob/master/images/diagram.v2.PNG)
