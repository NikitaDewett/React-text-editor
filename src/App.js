import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import TextInput from "./text-input/TextInput";

class App extends Component {

    constructor(props) {
        super(props)
        this.controlPanelRef = React.createRef();
    }

    /**
     * Callback for textArea on click event
     * @param inputTags {Array} tags of selected word
     */
    textInputCallback = (inputTags) => {
        this.updateControlPanel(inputTags)
    };

    /**
     * Update control panel due to the active formatting in the text area
     * @param inputTags {Array} tags of selected word
     */
    updateControlPanel(inputTags){
        this.controlPanelRef.current.updateButtons(inputTags)
    };

    render() {
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <div className="main-container">
                        <div className="components-holder">
                            <ControlPanel ref={this.controlPanelRef}/>
                            <TextInput callback={this.textInputCallback}/>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
