import React from 'react'
import axios from '../../Config/axios'

class Register extends React.Component{
        constructor(){
            super()
            this.state={
                username:'',
                email:'',
                password:''
            }
            this.handleChange=this.handleChange.bind(this)
            this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange(e){
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleSubmit(e){
        e.preventDefault()
        const formData={
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }
        axios.post(`/users/register`,formData)
        .then(response=>{
            if(response.data.errors){
                alert(response.data.message)
            }else {
                this.props.history.push('/user/login')
            }
        })
        .catch(err=> {
            alert(err)
        })
    }

    render(){
        return(         
            <form onSubmit={this.handleSubmit}>
                <h2 >REGISTER</h2>
                <label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username"/>
                </label><br/>
                <label>
                    <input type="text" name="email" value={this.state.email}  onChange={this.handleChange} placeholder="Email"/>
                </label><br/>                       
                <label>                                
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                </label><br/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}

export default Register