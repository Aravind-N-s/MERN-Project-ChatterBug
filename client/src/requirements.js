import React from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'
import {Tabs, Tab} from '@material-ui/core'

export default class LoginPage extends React.Component {
    constructor(){
        super()
        this.state = {
            login: false
        }
    }
    render() {
        if(this.state.login){return <Redirect to="/users/login"/>}
        return (
            <img id="img" src="/1.jpg" data-file="/1.mp3" onClick={() => (this.setState(() => ({login:true})))}/>  
        )
    }
}

export class SelectButtons extends React.Component {
    constructor(){
        super()
        this.state = {
            account: false,
            new: false,
            list: false
        }
    }
    render() {
        if(this.state.new){return <Redirect to="/chat/new"/>}
        if(this.state.list){return <Redirect to="/chat/list"/>}
        if(this.state.account){return <Redirect to="/users/account"/>}
        return (
            <Tabs id="center" value={0}>
                <Tab label="new" onClick={() => (this.setState(() => ({new:true})))}/>
                <Tab label="list" onClick={() => (this.setState(() => ({list:true})))}/>
                <Tab label="account" onClick={() => (this.setState(() => ({account:true})))}/>
            </Tabs>       
        )
    }
}
