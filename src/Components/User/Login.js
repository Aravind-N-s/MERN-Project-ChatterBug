import React from 'react'
import {authAxios} from '../../utils/axios'
import {FormGroup,FormControl, Input, InputLabel, FormHelperText, Button} from '@material-ui/core'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }
    handleChange = (e) => {
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        authAxios.post(`/user/login`,formData)
        .then(response=>{
            if(response.data.errors){
                alert(response.data.errors)
            }else{
                const token=response.data.token
                if(token){
                    localStorage.setItem('userAuthToken',token)
                    this.props.handleAuth(true)
                }
            }
        })
        .catch(err =>{
            alert(err)
        })

    }
    render(){
        return(
            <FormGroup style={{float:"left"}} id="form">
                <FormControl id="input">
                    <InputLabel>Email</InputLabel>
                    <Input  type="text" name="email" value={this.state.email}  onChange={this.handleChange} placeholder="Email"/>
                    <FormHelperText>Must Haved Registered</FormHelperText>
                </FormControl>
                <FormControl id="input">
                    <InputLabel>Password</InputLabel>
                    <Input  type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                </FormControl>
                <Button variant="contained" id="button" onClick={this.handleSubmit}>Submit</Button> 
            </FormGroup>
        )
    }
}

export default Login