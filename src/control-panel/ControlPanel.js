import React, { PureComponent } from 'react';
import './ControlPanel.css';
import 'font-awesome/css/font-awesome.min.css';

class ControlPanel extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            boldActive: false,
            italicActive: false,
            underlineActive: false
        };
        this.buttonTypes = [{type:'bold'}, {type: 'italic'}, {type: 'underline'}];
    };

    /**
     * Highlight buttons due to the applied format of the word
     * @param inputTags {Array} tags of selected word
     */
    updateButtons(inputTags) {
        this.setState({
            boldActive: inputTags.includes('B'),
            italicActive: inputTags.includes('I'),
            underlineActive: inputTags.includes('U')
        })
    };

    /**
     * Enable chosen formatting
     * @param event {event} tags of selected word
     */
    formatText = (event) => {
        const buttonCommand = event.target.value;
        this.setState({
            [`${buttonCommand}Active`]: !this.state[`${buttonCommand}Active`]
        });
        document.execCommand(buttonCommand, false);
        event.preventDefault();
    };

    /**
     * Get class of the button due to applied formatting
     * @param buttonType {string} tags of selected word
     * @returns {string} class of the button
     */
    getButtonClass = (buttonType) => {
        return this.state[`${buttonType}Active`] ? `fa fa-${buttonType} btn active` : `fa fa-${buttonType} btn`;
    };

    render() {
        return (
            <div className="control-panel">
                <div className="format-actions toolbar">
                    {this.buttonTypes.map(button => 
                        <button key={button.type} className={this.getButtonClass(button.type)} value={button.type} type="button" onMouseDown={this.formatText}/>
                    )}
                </div>
            </div>
        );
    }
}

export default ControlPanel;