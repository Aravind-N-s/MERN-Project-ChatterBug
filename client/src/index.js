import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom'

import Login from './Components/User/Login'
import Register from './Components/User/Register'
import Account from './Components/User/Account'
import Logout from './Components/User/Logout'

import ChatList from './Components/Chat/ChatList'
import ChatGroup from './Components/Chat/ChatGroup'
import ChatNew from './Components/Chat/ChatNew'

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
                            <h2>Group Lists</h2>
                            <Link to='/chat/new'>New Group</Link>
                            <ChatList />
                            <Link to='/users/account'>Account</Link>
                            <Switch>
                                <>
                                    <Route exact strict path="/users/account" component={Account}/>
                                    <Route exact strict path="/chat" component={ChatList}/>
                                    <Route exact strict path="/chat/new" component={ChatNew}/>
                                    <Route exact strict path="/chat/:id" component={ChatGroup}/>
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
