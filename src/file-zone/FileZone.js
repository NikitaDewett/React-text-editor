import React, { Component } from 'react';
import './FileZone.css';
import ContentEditable from 'react-contenteditable'

class FileZone extends Component {
    constructor(props) {
        super(props)
        this.state = {html: ''};
        this.contentEditable = React.createRef();
    }
    handleChange = evt => {
        console.log('ccc')
      };
    render() {
        return (
            <ContentEditable
                onClick={(e)=>this.handleChange()}
                className="editor" 
                innerRef={this.contentEditable}
                html={this.state.html}
                disabled={false}       
                onChange={this.handleChange} 
            />
        );
    }
}

export default FileZone;
