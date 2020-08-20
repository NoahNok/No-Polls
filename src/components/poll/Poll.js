import React from 'react';
import {withRouter} from "react-router-dom";
import Box from "../common/Box";
import PollOptions from "./PollOptions";
import "./CreatePollOptions.scss";
import axios from 'axios';
import PollResults from "./PollResults";

class Poll extends React.Component {

    constructor() {
        super();
        this.state = {
            pollId: "",
            name: "Poll Name",
            options: [],
            selected: true,
            error: "",
            voted: false,
            finished: true,
            canVote: true,
            ready: false
        }

        this.childRef = React.createRef();
    }

    componentDidMount() {
        let pollId = this.props.match.params.pollId;
        this.setState({pollId: pollId});
        axios.get(`https://api-no-polls.noahdhollowell.co.uk/poll/${pollId}`)
            .then(response => {
                let data = response.data;
                this.setState({name: data.poll.name, finished: data.poll.finished, canVote: !data.hasVoted})
                this.setState({options: data.options, ready: true});
                this.childRef.current.setState({options: data.options});
            })
            .catch(error => console.log(error));
    }


    buttonSubmit = (event) => {
        if (this.childRef.current.state.selected === "") {
            this.setState({selected: false});
            return true;
        } else {
            this.setState({selected: true});
        }
        this.submitPollVote();
    }

    submitPollVote(){
        this.setState({error: ""})
        let optionId = this.childRef.current.state.selected;
        let pollId = this.state.pollId;
        console.log(`Poll: ${pollId} Option: ${optionId}`);

        axios.post("https://api-no-polls.noahdhollowell.co.uk/vote", {pollId: pollId, voteId: optionId})
            .then(response => {
                this.setState({voted: true, canVote: false})
            })
            .catch(error => this.setState({error: "Something went wrong! Please try again later"}));

    }

    switchToResults = (event) => {
        this.setState({voted: true})
    }

    switchToPoll = (event) => {
        this.setState({voted: false})
    }

    render() {


        return (
            <section>
                <Box>
                    <h1>{this.state.name} | ID: {this.state.pollId}</h1>
                    <hr/>
                    { (this.state.finished === 0 && this.state.canVote) && <p>{!this.state.voted &&
                    <span className="link" onClick={this.switchToResults}>View Results</span>}{this.state.voted &&
                    <span className="link" onClick={this.switchToPoll}>View Poll</span>}</p>}
                </Box>
                <br/>
                {   this.state.ready &&
                    <div>
                        {(!this.state.voted && this.state.finished === 0 && this.state.canVote) &&
                        <div>
                            <Box>
                                <PollOptions ref={this.childRef} options={this.state.options}/>
                            </Box>
                            <br/>
                            <Box>
                                <h1>Ready to vote</h1>
                                <hr/>
                                <br/>
                                <button className="btn" onClick={this.buttonSubmit}>Vote</button>
                                {this.state.selected === false &&
                                <p className="error">Please select a poll option</p>}
                                <p className="error">{this.state.error}</p>
                            </Box>
                        </div>
                        }
                        {
                            (!this.state.voted && this.state.finished === 0 && !this.state.canVote) &&
                            <div>
                                <Box>
                                    <p className="error">You have already voted on this poll!</p>
                                </Box>
                                <br/>
                            </div>
                        }
                        {
                            (this.state.finished !== 0 || !this.state.canVote || (this.state.voted && !this.state.finished)) &&
                            <div>
                                <Box>
                                    <h1>Poll Results</h1>
                                    <hr/>
                                    <PollResults pollId={this.state.pollId}/>
                                </Box>
                            </div>
                        }
                        {
                            this.state.finished !== 0 &&

                            <div>
                                <br/>
                                <Box>
                                    <h1>This poll has ended!</h1>
                                </Box>
                            </div>
                        }
                    </div>
                }
            </section>
        );
    }
}

export default withRouter(Poll);