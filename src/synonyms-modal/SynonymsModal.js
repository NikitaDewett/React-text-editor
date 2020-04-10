import React, { Component } from 'react';
import './SynonymsModal.css';
import { getSynonyms } from '../utils/dataProvider';
import PropTypes from 'prop-types';

class SynonymsModal extends Component {

    constructor(props) {
        super(props);
        this.state = { isOpened: false, synonymsArr: [] };
        this.modalText = '';
        this.modal = React.createRef();
    };

    /**
     * Close modal window
     */
    closeModal() {
        this.setState({ isOpened: false });
    };

    /**
     * Open modal window with list of synonyms loaded
     * @param text {string} selected word from textArea 
     * @param postion {obj} obj with x/y positions
     */
    async openModal(text, postion) {
        let synonyms = await getSynonyms(text)
        synonyms = synonyms.map(item => {
            return item.word
        })
        this.setState({ synonymsArr: [...synonyms], isOpened: true });
        this.modal.current.setAttribute('style', `left: ${postion.x}px; top: ${postion.y - 5}px`);
    };

    /**
     * Select synonym from loaded list and return it
     * to the text area via callback
     * @param e {event} tags of selected word
     */
    selectSynonym(e) {
        this.props.callback(e.target.textContent)
        this.setState({ isOpened: false });
    };

    render() {
        return (
            this.state.isOpened &&
            <div className="modal-dialog" ref={this.modal}>
                <div className="modal-content">
                    <div className="modal-header">
                        <a onClick={(e) => this.closeModal()} title="Close" className="close">×</a>
                    </div>
                    <div className="modal-body">
                        <ul>
                            {this.state.synonymsArr.length ?
                                this.state.synonymsArr.map(synonym => (
                                    <li key={synonym}><button className="btn success" onClick={(e) => { this.selectSynonym(e) }}>{synonym}</button></li>
                                )) :
                                <li className='no-synonyms' key={'noSynonyms'}>No synonyms were found</li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

SynonymsModal.propTypes = {
    callback: PropTypes.func
}

export default SynonymsModal;
