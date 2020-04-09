import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <div className="main-container">
                        <div className="components-holder">
                            <ControlPanel/>
                            <FileZone/>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
