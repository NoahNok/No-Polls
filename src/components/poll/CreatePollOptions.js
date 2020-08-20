import React from 'react';

class CreatePollOptions extends React.Component {

    constructor() {
        super();
        this.state = {options: []};
        this.delete = this.delete.bind(this);
        this.key = 0;
    }

    render() {
        let items = this.state.options.map((item) => <CreatePollOption key={item.id} option={item} parent={this} delete={this.delete}/>)
        return (
            <div>
                { items.length === 0 &&
                <p className="error">Add a poll option! <br /><br /> </p>
                }
                <ul className="poll-options">
                    {items}
                </ul>
                <button className="btn" onClick={this.create}>Add</button>
            </div>
        )
    }

    delete(id){
        this.setState(prevState => ({
            options: prevState.options.filter(key => key.id !== id)
        }));
    }

    create = (event) => {
        this.setState(ps => ({
            options: ps.options.concat({id: this.returnKey(), name: ""})
        }));
    }

    returnKey() {
        let key = this.key;
        this.key++;
        return key;
    }

    getOptions() {
        return this.state.options;
    }

}

class CreatePollOption extends React.Component {

    constructor() {
        super();
        this.state = {name: ""}

    }

    componentDidMount() {
        this.setState({name: this.props.option.name});
    }

    render() {
        return (
            <div className="poll-option">
                <input type="text" value={this.state.name} onChange={this.handleChange} />
                <span onClick={this.props.delete.bind(this, this.props.option.id)}>X</span>
            </div>
        )
    }

    handleChange = (event) => {
        let name = event.target.value;
        this.setState({name: event.target.value});
        let thiss = this;

        let options = this.props.parent.state.options;
        let newOptions = [];
        options.forEach(op => {
            if (op.id === thiss.props.option.id){
                op.name = name;
            }
            newOptions.push(op);
        })

        this.props.parent.setState({options: newOptions});
    }


}
export default CreatePollOptions;