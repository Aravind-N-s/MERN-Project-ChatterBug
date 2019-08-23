import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom'

import Login from './Components/User/Login'
import Register from './Components/User/Register'
import Account from './Components/User/Account'
import Logout from './Components/User/Logout'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isAuthenticated: false
        }
        this.handleAuth=this.handleAuth.bind(this)
    }

    handleAuth = (bool) => {
        this.setState({isAuthenticated:bool})
    }

    componentDidMount(){
        if(localStorage.getItem('userAuthToken')){
            this.setState({isAuthenticated: true})
        }
    }

    render() {
        return (
            <BrowserRouter >
                <div>
                    {!this.state.isAuthenticated &&(
                        <div>
                            <Link to='/users/login'>Login</Link>
                            <Switch>
                                <>
                                    <Route exact strict path="/users/login" render={(props)=>{
                                        return <Login {...props } handleAuth={this.handleAuth}/>}}/>
                                    <Route exact strict path="/users/register" component={Register}/>
                                </>
                            </Switch>
                        </div>
                    )}
                    { this.state.isAuthenticated && (
                        <div>
                            <h1>Hello</h1>
                            <Link to='/users/account'>Account</Link>
                            <Switch>
                                <>
                                    <Route exact strict path="/users/account" component={Account}/>
                                    <Route exact strict path="/users/logout" render={(props)=>{
                                        return <Logout {...props} handleAuth={this.handleAuth}/> }}/>
                                </>
                            </Switch>
                        </div>
                    )}                                           
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />,document.getElementById('root'))
