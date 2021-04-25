import "./app.css";
import React from "react";
import ReactDOM from "react-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Collapse
} from "@material-ui/core";

import Header from "./utils/header";

import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import Account from "./Components/User/Account";
import Logout from "./Components/User/Logout";

import ChatList from "./Components/Chat/ChatList";
import ChatGroup from "./Components/Chat/ChatGroup";
import ChatNew from "./Components/Chat/ChatNew";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      click: false
    };
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth = bool => {
    this.setState({ isAuthenticated: bool });
  };

  componentDidMount() {
    if (localStorage.getItem("userAuthToken")) {
      this.setState({ isAuthenticated: true });
    }
  }
  render() {
    return (
      <BrowserRouter>
        <Header />
        <>
          {!this.state.isAuthenticated && (
            <div id="homepage">
              <img id="img" alt="loginImg" src="/1.jpg" />
              <Tabs id="tabs">
                <TabList>
                  <Tab>Login</Tab>
                  <Tab>Register</Tab>
                </TabList>
                <TabPanel className={{ marginBottom: "0%" }}>
                  <Login handleAuth={this.handleAuth} />
                </TabPanel>
                <TabPanel>
                  <Register handleAuth={this.handleAuth} />
                </TabPanel>
              </Tabs>
            </div>
          )}
          {this.state.isAuthenticated && (
            <div>
              <List>
                <ListItem button>
                  <ListItemText primary="Create Group" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="List Group" button />
                  <Collapse timeout="auto" unmountOnExit>
                    <List>
                      <ListItem Button>
                        <ChatList />
                      </ListItem>
                    </List>
                  </Collapse>
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Account" />
                  <Collapse timeout="auto" unmountOnExit>
                    <Account />
                  </Collapse>
                </ListItem>
              </List>

              <Switch>
                <>
                  <Route
                    exact
                    strict
                    path="/users/account"
                    component={Account}
                  />
                  <Route exact strict path="/chat/new" component={ChatNew} />
                  <Route exact strict path="/chat/list" component={ChatList} />
                  <Route exact strict path="/chats/:id" component={ChatGroup} />
                  <Route
                    exact
                    strict
                    path="/users/logout"
                    render={props => {
                      return <Logout {...props} handleAuth={this.handleAuth} />;
                    }}
                  />
                </>
              </Switch>
            </div>
          )}
        </>
      </BrowserRouter>
    );
  }
}
export default App