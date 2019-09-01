import React from 'react'
import io from 'socket.io-client'
import axios from '../../Config/axios'
import {FormControl, Input, Button} from '@material-ui/core'

let socket
class ChatGroup extends React.Component{
    constructor(){
        super()
        this.state ={
            groupDetails:'',
            text:'',
            message:'text will appear here'
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(e){
        e.persist()
        this.setState(() => ({
            text : e.target.value
        }))
    }

    handleSubmit(e){
        e.preventDefault()
        socket.emit('chat message',this.state.text)
        this.setState(()=>({
            text: ''
        }))
    }

    componentDidMount(props){
        const id=this.props.match.params.id
        axios.get(`/chat/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('userAuthToken')
            }
        })
        .then(response =>{
            this.setState(() =>({
                groupDetails: response.data
            }))
        })
    }

    componentWillMount(){
        if(!socket) {
            socket = io(':3001')
            socket.on('chat message', (msg) => {
                this.setState((prevState) => ({
                    message: [msg, ...prevState.message]
                }))
            })
        }
    }

    render(){
        // console.log(this.state.groupDetails)
        
        return(
            <div>
                <p>{this.state.groupDetails && (
                        this.state.groupDetails.group
                )}</p>
                <p>{this.state.message}+'/n'</p><br />
                <p>Output</p>
                <FormControl>
                    <Input type="text" multiline placeholder="Message" value={this.state.text} onChange={this.handleChange}/>
                    <Button
                        onClick={this.handleSubmit}
                    >Send</Button>
                </FormControl>
            </div>
        )
    }
}

export default ChatGroup