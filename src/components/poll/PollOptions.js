import React from 'react';

class PollOptions extends React.Component {

    constructor() {
        super();
        this.state = {
            options: [],
            selected: ""
        }
        this.setSelected = this.setSelected.bind(this);
    }

    componentDidMount() {
        this.setState({options: this.props.options});
        console.log(this.props.options);
    }


    render(){
        let items = this.state.options.map((item) => <PollOption key={item.id} option={item} selected={this.state.selected} setSelected={this.setSelected}/>)
        return (
            <div>
                { items }
            </div>
        )
    }

    setSelected(id){
        this.setState({selected: id});
    }

    getSelected(){
        return this.state.selected;
    }

}

class PollOption extends React.Component {

    render() {
        return (
            <div className="poll-option">
                <input type="radio" value={this.props.option.id} checked={this.props.selected === this.props.option.id} onChange={this.props.setSelected.bind(this, this.props.option.id)}/>
                <p>{this.props.option.name}</p>
            </div>
        )
    }
}

export default PollOptions;