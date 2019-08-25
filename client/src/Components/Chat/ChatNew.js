import React from 'react'
import Select from 'react-select'
import axios from '../../Config/axios'
import {FormControl, Input, InputLabel} from '@material-ui/core'

class ChatNew extends React.Component{
    constructor(){
        super()
        this.state = {
            users:[],
            groupName:'',
            groupDesc:'',
            twoLevel:[]
            // threeLevel:'' 
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleChange(e){
        e.persist()
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
    }
    
    handleSelect(e){
        const val=e[0].value
        this.setState((prevState) => ({
            twoLevel : prevState.twoLevel.concat(val)
        }))
    }

    componentDidMount(){
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
        return(
            <div>
                <FormControl>
                    <InputLabel>Group Name</InputLabel>
                    <Input type="text" placeholder="Group Name" name="groupName" value={this.state.groupName} onChange={this.handleChange}/><br/>
                </FormControl><br/>
                <FormControl>
                    <InputLabel>Group Desc</InputLabel>
                    <Input type="text" placeholder="Group Desc" name="groupDesc" value={this.state.groupDesc} onChange={this.handleChange}/>
                </FormControl><br/>
                <FormControl>
                    <Select 
                        closeMenuOnSelect={false}
                        isMulti
                        onChange={this.handleSelect}
                        options ={
                            this.state.users && (
                                this.state.users.map(user => {
                                    return{
                                        name: 'twoLevel',
                                        value: user._id,
                                        label: user.email
                                    }
                                })
                            )
                        }
                    />
                </FormControl><br/>
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
            </div>
        )
    }
}

export default ChatNew