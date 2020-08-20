import React from 'react';
import { Link } from 'react-router-dom';
import "./ButtonLink.scss";

class ButtonLink extends React.Component {

    render() {
        return (
            <Link className="btn" to={this.props.to}>{this.props.name}</Link>
        );
    }
}

export default ButtonLink;