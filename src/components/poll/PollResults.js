import React from 'react';
import axios from 'axios';
import './PollResult.scss'

class PollResults extends React.Component {

    constructor() {
        super();
        this.state = {
            options: []
        }
    }

    componentDidMount() {
        let pollId = this.props.pollId;
        axios.get(`https://api-no-polls.noahdhollowell.co.uk/poll/${pollId}/results`)
            .then(response => {
                this.setState({options: response.data})
            })
            .catch(error => console.log(error));
    }

    render() {
        let items = this.state.options.map((item) => <PollResult key={item.name} option={item}/>)
        return (
            <div>
                {items}
            </div>
        )
    }

}

class PollResult extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            votes: 0,
            totalVotes: 0,
        }
    }

    componentDidMount() {
        this.setState(this.props.option);
    }

    render() {
        return (
            <div className="poll-result">
                <p>{ this.state.name }  - <span className="votes">{ this.state.votes }</span></p>

            </div>
        )
    }
}
export default PollResults;