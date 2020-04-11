import React, { Component } from 'react';
import './TextInput.css';
import ContentEditable from 'react-contenteditable'
import PropTypes from 'prop-types';
import SynonymsModal from '../synonyms-modal/SynonymsModal'

class TextInput extends Component {
    constructor(props) {
        super(props)
        this.state = { html: '' };
        this.position = {};
        this.modalRef = React.createRef();
        this.selectedText = '';
        this.textArea = React.createRef();
    };

    /**
     * Open modal with synonyms and higlight 
     * active formatting button
     * @param e {event}
     */
    handleChange = e => {
        // Editor container 
        let editorElement = this.textArea.current;

        //selection
        this.selectedText = window.getSelection();

        //num of ranges
        let numRanges = this.selectedText.rangeCount;

        // Will hold parent tags of a range
        let rangeParentTags;

        // Will hold parent tags of all ranges
        let allRangesParentTags = [];

        // Current menu tags
        let menuTags = ['B', 'I', 'U'];

        // Will hold common tags from all ranges
        let menuTagsCommon = [];

        let startElement,
            endElement,
            curElement;

        /**
         * push all parent tags when more than 1 word is selected
         * @param range {object}
         */
        var addParentTags = (range) =>{
            range.forEach(e => rangeParentTags.push(e.nodeName));
        }

        // For all ranges
        for (let i = 0; i < numRanges; i++) {
            // Start container of range
            startElement = window.getSelection().getRangeAt(i).startContainer;

            // End container of range
            endElement = window.getSelection().getRangeAt(i).endContainer;

            // Will hold parent tags of a range
            rangeParentTags = [];

            // If starting node and final node are the same
            if (startElement.isEqualNode(endElement)) {
                // If the current element lies inside the editor container then don't consider the range
                // This happens when editor container is clicked
                if (editorElement.isEqualNode(startElement)) {
                    allRangesParentTags.push([]);
                    continue;
                }

                curElement = startElement.parentNode;

                // Get all parent tags till editor container    
                while (!editorElement.isEqualNode(curElement)) {
                    rangeParentTags.push(curElement.nodeName);
                    curElement = curElement.parentNode;
                }
            } else{
                //Here we're getting all tags for all words in the selection
                var range = window.getSelection().getRangeAt(i).cloneContents().querySelectorAll('*');
                addParentTags(range);
            }
            // Push tags of current range 
            allRangesParentTags.push(rangeParentTags);
        }

        // Find common parent tags for all ranges
        for (var i = 0; i < menuTags.length; i++) {
            var commonTag = 1;
            for (var j = 0; j < allRangesParentTags.length; j++) {
                if (allRangesParentTags[j].indexOf(menuTags[i]) === -1) {
                    commonTag = -1;
                    break;
                }
            }

            if (commonTag === 1)
                menuTagsCommon.push(menuTags[i]);
        }
        if (this.selectedText.type === 'Range') {
            let rangeStart = this.selectedText.getRangeAt(0);
            let textPosition = rangeStart.getBoundingClientRect();
            this.modalRef.current.openModal(this.selectedText.toString(), {x: textPosition.x, y: textPosition.y});
        } else{
            this.modalRef.current.closeModal();
        }
        let isEqualNodes = this.selectedText.anchorNode.isEqualNode(this.selectedText.focusNode) && editorElement.isEqualNode(this.selectedText.anchorNode)

        if(!isEqualNodes){
            this.props.callback(menuTagsCommon);
        }

    };

    /**
     * Apply chosen synonym from modal 
     * @param synonym {sting} 
     */
    applySynonym = synonym => {
        this.replaceSelectedText(synonym);
    };

    /**
     * Replace selected text on chosen synonym 
     * @param replacementText {sting} synonym to replace selected text
     */
    replaceSelectedText(replacementText) {
        let range;
        if (window.getSelection) {
            if (this.selectedText.rangeCount) {
                range = this.selectedText.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(replacementText));
                this.selectedText.removeAllRanges();
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.text = replacementText;
        }
    }

    componentDidMount(){
        var el = this.textArea.current;
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(el, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    render() {
        return (
            <React.Fragment>
                <SynonymsModal ref={this.modalRef} callback={this.applySynonym} />
                <ContentEditable
                    onClick={this.handleChange}
                    className="editor"
                    innerRef={this.textArea}
                    html={this.state.html}
                    disabled={false}
                    onChange={this.handleChange}
                />
            </React.Fragment>
        );
    }
}

TextInput.propTypes = {
    callback: PropTypes.func
}

export default TextInput;
