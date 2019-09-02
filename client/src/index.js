import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter, Switch, Route,NavLink} from 'react-router-dom'
import {AppBar, Toolbar} from '@material-ui/core'

import Login from './Components/User/Login'
import Register from './Components/User/Register'
import Account from './Components/User/Account'
import Logout from './Components/User/Logout'

import ChatList from './Components/Chat/ChatList'
import ChatGroup from './Components/Chat/ChatGroup'
import ChatNew from './Components/Chat/ChatNew'
import ListPage, {SelectButtons} from './requirements'

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
                        <AppBar>
                            <Toolbar style={{background:"black"}}>
                                <h1 id="chatName1">ChatApp</h1>
                            </Toolbar>
                        </AppBar>    
                        <Switch>
                            <>
                                <Route exact strict path="/" component={ListPage}/>
                                <Route exact strict path="/users/login" render={(props)=>{
                                    return <Login {...props } handleAuth={this.handleAuth}/>}}/>
                                <Route exact strict path="/users/register" render = {(props) => {
                                    return <Register {...props} handleAuth={this.handleAuth}/>}}/>
                            </>
                        </Switch>
                        </div>
                    )}
                    {this.state.isAuthenticated && (
                        <div>
                            <AppBar>
                                <Toolbar id='loginBar'>
                                    <img style={{width:'4%',height:'70px',borderRadius: '50%'}} alt="loginImg" src="/1.jpg"/>
                                    <h1 id="chatName">ChatApp</h1>
                                    <NavLink style={{color:"red", marginLeft:"45%"}}to='/'>Home</NavLink>
                                </Toolbar>
                            </AppBar> 
                            <Switch> 
                                <>
                                    <Route exact strict path="/" component={SelectButtons}/>
                                    <Route exact strict path="/users/account" component={Account}/>
                                    <Route exact strict path="/chat/new" component={ChatNew}/>
                                    <Route exact strict path="/chat/list" component={ChatList}/>
                                    <Route exact strict path="/chats/:id" component={ChatGroup} />
                                    <Route exact strict path="/users/logout" render={(props)=>{
                                        return <Logout {...props} handleAuth={this.handleAuth}/>
                                    }}/>
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
