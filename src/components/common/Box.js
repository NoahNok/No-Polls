import React from 'react';

class Box extends React.Component {

    render() {
        return (
            <div className="box">
                {this.props.image !== undefined &&
                    <div className={"image " + (this.props.imageWidth === undefined ? "i-40" : this.prop.imageWidth) }>
                        <img src={this.props.image.url} alt={this.props.image.alt}/>
                    </div>
                }
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }

}
export default Box;