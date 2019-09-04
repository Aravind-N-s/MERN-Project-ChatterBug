import React from 'react'
import Select from 'react-select'
import axios from '../../Config/axios'
import {FormControl, Input, InputLabel, Button} from '@material-ui/core'

class ChatNew extends React.Component{
    constructor(){
        super()
        this.state = {
            usr:'',
            users:[],
            groupName:'',
            groupDesc:'',
            twoLevel:[]
            // threeLevel:'' 
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }
    
    handleSelect(e){
        const select = e
        this.setState(() => ({
            twoLevel : select._id
        }))    
    }
    handleSubmit(e){
        const formData = {
            group:this.state.groupName,
            desc:this.state.groupDesc,
            twoLevel:this.state.twoLevel
        }
        axios.post('/chat',formData,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        }) 
        .then(response=>{
            console.log(response.data)
            this.props.history.push('/chat/list')
        })
    }

    componentDidMount(){
        axios.get('/users/account',{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response =>{
            const usr = response.data
            this.setState ({usr})
        })

        axios.get('/users/info',{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response =>{
            const users = response.data
            this.setState ({users})
        })
    }
    render(){
        console.log(this.state)
        {/* <FormControl>
            <Select 
                closeMenuOnSelect={false}
                isMulti
                options ={
                    this.state.users && (
                        this.state.users.map(user => {
                            return{
                                name: user,
                                value: user._id,
                                label: user.email
                            }
                        })
                    )
                }
            />
        </FormControl> */}
        return(
            <div style={{marginTop:"10%"}} id="formLog">
                <h2>Create Group</h2>
                <FormControl id="input">
                    <InputLabel>Group Name</InputLabel>
                    <Input type="text" placeholder="Group Name" name="groupName" value={this.state.groupName} onChange={this.handleChange}/><br/>
                </FormControl><br/>
                <FormControl id="input">
                    <InputLabel>Group Desc</InputLabel>
                    <Input type="text" placeholder="Group Desc" name="groupDesc" value={this.state.groupDesc} onChange={this.handleChange}/>
                </FormControl><br/>
                <FormControl style={{marginTop:"10px",width:'50%',marginBottom:"10px"}}>
                    <Select
                        closeMenuOnSelect={false}
                        isMulti
                        onChange={this.handleSelect}
                        options ={
                            this.state.users && (
                                this.state.users.map(ur => {
                                    return{
                                        name: 'twoLevel',
                                        value: ur._id,
                                        label: ur.email
                                    }
                                })
                            )
                        }
                    />
                </FormControl><br/>
                <Button onClick={this.handleSubmit}>Submit</Button>
            </div>
        )
    }
}

export default ChatNew