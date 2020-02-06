import React, {Fragment} from 'react'
import {Redirect} from 'react-router-dom'
import {AppBar, Toolbar, Button} from '@material-ui/core'

const Header = () => {
  const token = localStorage.getItem('userAuthToken')
  return(
    <Fragment>
      {token ? (
        <AppBar id='loginBar'>
          <Toolbar>
            <img style={{width:'4%',height:'60px',borderRadius: '50%'}} alt="loginImg" src="/1.jpg"/>
            <h1 id="chatName">ChatApp</h1>
            <button onClick={() =>(<Redirect to='/users/account'/>)}>Account</button>
          </Toolbar>
        </AppBar > 
        ): (
          <AppBar style={{background:"blueviolet"}}>
            <Toolbar>
              <h1 id="chatName1">ChatApp</h1>
            </Toolbar>
          </AppBar>
        )
      }
    </Fragment>
  )
}
export default Header