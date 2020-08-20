import React from 'react';
import axios from 'axios';
import Box from "../common/Box";
import CreatePollOptions from "./CreatePollOptions";
import "./CreatePollOptions.scss";
import { Redirect } from 'react-router-dom';

class CreatePoll extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            options: [],
            error: "",
            loading: false,
            redirect: false,
            redirect_id: ""
        }
        this.childRef = React.createRef();
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    handlePollCreateButton = (event) => {
        if (this.childRef.current.getOptions().length === 0){
            this.setState({error: "Please add some options first!"});
            setTimeout(() => {
                this.setState({error: ""});
            }, 2000);
            return true;
        }
        if (this.state.name.length <= 0) return true;
        // Everything is good so submit
        this.submitPollCreation();
    }

    submitPollCreation(){
        this.setState({error: "", loading: true});
        let name = this.state.name;
        let options = this.childRef.current.getOptions();

        axios.post(`https://api-no-polls.noahdhollowell.co.uk/create`, {name: name, options: options})
            .then(response => {
                let pollId = response.data.pollId;
                this.setState({'redirect_id': pollId, redirect: true});

            })
            .catch(error => this.setState({error: "Something went wrong! Please try again!", loading: false}));

    }

    render() {
        return (
            <section>
                { this.state.redirect &&
                    <Redirect to={"/" + this.state.redirect_id} />
                }
                <Box>
                    <h1>Create Poll</h1>
                    <hr/><br/>


                        <div>
                            <label className='label'>Name : </label>
                            <input type='text' autoComplete="off" name="name" value={this.state.name} onChange={this.handleNameChange} />
                            { this.state.name.length === 0 &&
                            <p className="error">Please provide a name for the poll!</p>}
                        </div>


                </Box>
                <br/>
                <Box>
                    <h1>Poll Options</h1>
                    <hr/>
                    <br/>
                    <CreatePollOptions ref={this.childRef} />
                </Box>
                <br/>
                <Box>
                    <h1>Finalise</h1>
                    <hr/>
                    <p>When you are happy, press below to create your poll!</p>
                    <button className="btn" onClick={this.handlePollCreateButton}>Create Poll</button>
                    <p className="error">{ this.state.error }</p>
                    { this.state.loading &&
                    <p>Creating...</p>}
                </Box>
            </section>
        );
    }
}

export default CreatePoll;