import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import TextInput from "./text-input/TextInput";

class App extends Component {

    constructor(props) {
        super(props)
        this.controlPanelRef = React.createRef();
    }

    textInputCallback = (inputTags) => {
        this.updateControlPanel(inputTags)
    }

    updateControlPanel(inputTags){
        this.controlPanelRef.current.updateButtons(inputTags)
    }
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
