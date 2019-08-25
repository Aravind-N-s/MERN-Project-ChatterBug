import React from 'react'
import axios from '../../Config/axios';

class ChatGroup extends React.Component{
    constructor(){
        super()
        this.state ={
            groupDetails:''
        }
    }

    componentDidMount(props){
        const id=this.props.match.params.id
        console.log(id)
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

    render(){
        console.log(this.state.groupDetails)
        return(
            <div>
                <p>{this.state.groupDetails && (
                        this.state.groupDetails.group
                )}</p>
                <p>{this.state.groupDetails && (
                        this.state.groupDetails.userAdmin._id
                )}</p>
                <p>Output</p>
                <form>
                    <input type="text" placeholder="Message"/>
                </form>
            </div>
        )
    }
}

export default ChatGroup