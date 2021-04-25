import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {AppBar, Toolbar, List, ListItem, ListItemAvatar, ListItemText, ListItemIcon, Collapse} from '@material-ui/core'


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
            isAuthenticated: false,
            click: false
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
                        <div >
                             <AppBar style={{background:"blueviolet"}}>
                                <Toolbar>
                                    <h1 id="chatName1">ChatApp</h1>
                                </Toolbar>
                            </AppBar>
                            <div id="homepage">    
                                <img id="img" alt="loginImg" src="/1.jpg"/>
                                <Tabs id="tabs">
                                    <TabList>
                                        <Tab>Login</Tab>
                                        <Tab>Register</Tab>
                                    </TabList>
                                    <TabPanel className={{marginBottom:"0%"}}><Login handleAuth={this.handleAuth}/></TabPanel>
                                    <TabPanel><Register handleAuth={this.handleAuth}/></TabPanel>
                                </Tabs>
                            </div>
                        </div>
                    )}
                    {this.state.isAuthenticated && (
                        <div>
                            <AppBar>
                                <Toolbar id='loginBar'>
                                    <img style={{width:'4%',height:'70px',borderRadius: '50%'}} alt="loginImg" src="/1.jpg"/>
                                    <h1 id="chatName">ChatApp</h1>
                                </Toolbar>
                            </AppBar> 
                            <div>
                            <List>
                                <ListItem button>
                                    <ListItemText primary="Create Group"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="List Group" button/>
                                    <Collapse timeout="auto" unmountOnExit>
                                        <List>
                                            <ListItem Button>
                                                <ChatList/>
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                </ListItem>
                                <ListItem button>
                                    <ListItemText primary="Account"/>
                                    <Collapse timeout="auto" unmountOnExit>
                                        <Account/>
                                    </Collapse>
                                </ListItem>
                               
                            </List>
                            </div>
                            <Switch> 
                                <>
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
