import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NoteProperties from './NoteProperties.jsx';
import Note from './Note';
import './Note.css';

class NoteComponent extends Component {
    static propTypes = {
        note: PropTypes.instanceOf(Note).isRequired,
        onUpdate: PropTypes.func.isRequired
    };

    static SMALL_TEXT_LENGTH = 14;
    static MAX_TEXT_LENGTH = 140;

    shortenText = (text) => text.length > Note.MAX_TEXT_LENGTH ? text.substring(0, Note.MAX_TEXT_LENGTH) + '...' : text;

    render() {
        const {note: {text, archived, color}, note, onUpdate} = this.props;
        const noteClassses = `Note ${archived ? 'archived' : ''}`;
        const textClasses = `text ${text.length > Note.SMALL_TEXT_LENGTH ? 'small-text' : ''}`;
        return (
            <div className={noteClassses} style={{backgroundColor: color}}>
                <p className={textClasses}>{this.shortenText(text)}</p>
                <NoteProperties onEdit={onUpdate} note={note}/>
            </div>
        );
    }
}

export default NoteComponent;