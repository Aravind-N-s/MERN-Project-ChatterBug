import React from 'react'
import {Redirect} from 'react-router-dom'
import {authAxios} from '../../utils/axios'
import {Button} from '@material-ui/core'

class Account extends React.Component{
    constructor(){
        super()
        this.state={
            user:{},
            click:false
        }
    }
    // tokens are sending to server
    componentDidMount(){
        authAxios.get(`/user/account`,{
            headers:{
                'Authorization':`JWT + ${localStorage.getItem('userAuthToken')}`
            }
        }) 
        .then (response=>{
            const user=response.data
            this.setState({user})
        })
    }
    render(){
        if(this.state.click){return <Redirect to="/users/logout"/>}
        return(
            <div id="account">
                <h2>User Account</h2>
                <img style={{width:'7%',height:'70px',borderRadius: '50%'}} src='/2.jpeg' alt='user Profile'/>
                <h3>{this.state.user.username}</h3>
                <Button onClick={() => (this.setState(() => ({click:true})))}>Logout</Button>
            </div>
        )
    }
}
export default Account