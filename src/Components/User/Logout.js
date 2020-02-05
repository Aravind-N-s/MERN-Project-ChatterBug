import React from 'react'
import {authAxios} from '../../utils/axios';

class Logout extends React.Component{
    
    componentDidMount(){
        authAxios.delete(`/user/logout`,{
        headers:{
            'Authorization':`JWT ${localStorage.getItem('userAuthToken')}`
        }
        })
        .then(response=>{
            localStorage.removeItem('userAuthToken')
            this.props.handleAuth(false)
            this.props.history.push('/')
        })
    }
    render(){
        return(
            <p>logging out..</p>
        )
    }
}

export default Logout