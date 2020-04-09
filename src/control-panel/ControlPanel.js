import React, { Component } from 'react';
import './ControlPanel.css';
import 'font-awesome/css/font-awesome.min.css';

class ControlPanel extends Component {

    constructor(props) {
        super(props)
        this.state = {
            boldActive: false, 
            italicActive: false, 
            underlineActive: false
        };
    }

    formatText(event, buttonCommand, value) {
        this.setState({
            [`${buttonCommand}Active`]: !this.state[`${buttonCommand}Active`]
        });
        document.execCommand(buttonCommand, false, value);
    }
    getButtonClass(buttonType){
        return this.state[`${buttonType}Active`] ? `fa fa-${buttonType} btn active` : `fa fa-${buttonType} btn`;
    }

    render() {
        return (
            <div className="control-panel">
                <div className="format-actions toolbar">
                    <button className={this.getButtonClass('bold')} type="button" onClick={(e) => this.formatText(e, 'bold')}></button>
                    <button className={this.getButtonClass('italic')} type="button" onClick={(e) => this.formatText(e, 'italic')}></button>
                    <button className={this.getButtonClass('underline')} type="button" onClick={(e) => this.formatText(e, 'underline')}></button>
                </div>
            </div>
        );
    }
}

export default ControlPanel;
