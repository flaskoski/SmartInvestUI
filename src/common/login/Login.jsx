import { Button, Checkbox, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { passwordType: "password" }
        this.handleInput = this.handleInput.bind(this)
        this.toggleShowPassword = this.toggleShowPassword.bind(this)
        this.signIn = this.signIn.bind(this)
        this.signOut = this.signOut.bind(this)
        
        Auth.currentUserCredentials().then(info => {
            if(info) 
                this.setState({isSignedIn: true, username: info.username})
        }).catch(e => console.log("Not signed in!"))
    }
    handleInput(event){
        const name = (event.target.id ?event.target.id : event.target.name);
        const newValue = event.target.value;
        this.setState({ 
                [name]: newValue});
    };

    //salvar credênciais Cognito no localStorage
    getPoolData() {
        return {
            UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID,
            ClientId: process.env.REACT_APP_COGNITO_APP_ID
        }
    }

    //chavear entre exibir ou ocultar senha
    toggleShowPassword(event){
        if (this.state.passwordType === "password")
            this.setState({ passwordType: "text" })
        else
            this.setState({ passwordType: "password" })
    }

    async signIn() {
        try {
            const user = await Auth.signIn(this.state.username, this.state.password);
            console.log(user)
            this.setState({isSignedIn: true, username: user.username})
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    async signOut() {
        try {
            await Auth.signOut();
            this.setState({isSignedIn: false})
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    render() { 
        Auth.currentUserPoolUser()
        .catch(e => {
            console.log(e)
            if(this.state.isSignedIn) this.setState({isSignedIn: false})
        })
        return ( 
            
        <section>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h4 className="display-4">Smart Invest - Login</h4>
                    {/* <p class="lead">Integração cognito via javascript</p> */}
                </div>
            </div>

            <div id="sign-in-form" className="container" hidden={this.state.isSignedIn}>
                <div className="form-group" id="userNameDiv">
                    <TextField  label="User name" onChange={this.handleInput} type="text" id="username"></TextField>
                </div>
                <div className="form-group" id="userPasswordDiv">
                    <TextField label="Password" onChange={this.handleInput} type={this.state.passwordType} id="password"></TextField>
                    <Checkbox style={{verticalAlign: "bottom" }} onChange={this.toggleShowPassword} onclick="toggleShowPassword('showPasswordCheckbox', 'userPassword')" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />
                    <label style={{verticalAlign: "bottom", paddingBottom: "11px" }} className="form-check-label" for="showPasswordCheckbox">Show password</label>
                </div>

                <Button variant="contained" color="primary" onClick={this.signIn} >Login</Button> 
                <br /><br />
                <div>
                    <pre id="responsediv"></pre>
                </div>
            </div>
            <div id="sign-out-form" className="container" hidden={!this.state.isSignedIn}>
                <div className="form-group" id="userNameDiv">
                    <p className="lead" style={{verticalAlign: "bottom", paddingBottom: "11px" }}>Bem-vindo {this.state.username}!</p>
                        <Button variant="contained" color="primary" onClick={this.signOut} >Sign Out</Button> 
                </div>
            </div>
        </section>
         );
    }
}
 
export default Login;