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
    };

    /**
     * Highlight buttons due to the applied format of the word
     * @param inputTags {Array} tags of selected word
     */
    updateButtons(inputTags) {
        inputTags.indexOf('B') !== -1 ? this.setState({ boldActive: true }) : this.setState({ boldActive: false });
        inputTags.indexOf('I') !== -1 ? this.setState({ italicActive: true }) : this.setState({ italicActive: false });
        inputTags.indexOf('U') !== -1 ? this.setState({ underlineActive: true }) : this.setState({ underlineActive: false });
    };

    /**
     * Enable chosen formatting
     * @param event {event} tags of selected word
     * @param buttonCommand {string} type of formating
     * @param value additional params for execCommand
     */
    formatText(event, buttonCommand, value) {
        this.setState({
            [`${buttonCommand}Active`]: !this.state[`${buttonCommand}Active`]
        });
        document.execCommand(buttonCommand, false, value);
    };

    /**
     * Get class of the button due to applied formatting
     * @param buttonType {string} tags of selected word
     * @returns {string} class of the button    
     */
    getButtonClass(buttonType) {
        return this.state[`${buttonType}Active`] ? `fa fa-${buttonType} btn active` : `fa fa-${buttonType} btn`;
    };

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
