import React from 'react'
import {connect} from 'react-redux'
import {Button} from '@material-ui/core'

const Account = props =>{
    const {user} = props;
    return(
        <div id="account">
            <h2>User Account</h2>
            <img style={{width:'7%',height:'70px',borderRadius: '50%'}} src='/2.jpeg' alt='user Profile'/>
            <h3>{user.username}</h3>
            <Button>Logout</Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(Account)