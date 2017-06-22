import React, {Component} from 'react';
import './Note.css';
import NoteProperties from './NoteProperties.jsx';

class Note extends Component {
    static SMALL_TEXT_LENGTH = 14;
    static MAX_TEXT_LENGTH = 140;

    shortenText = (text) => text.length > Note.MAX_TEXT_LENGTH ? text.substring(0, Note.MAX_TEXT_LENGTH) + '...' : text;

    onEdit = () => this.props.onEdit(this.props.note);

    render() {
        const {note: {text, archived, color}, note, onUpdate} = this.props;
        const noteClassses = `Note ${archived ? 'archived' : ''}`;
        const textClasses = `text ${text.length > Note.SMALL_TEXT_LENGTH ? 'small-text' : ''}`;
        return (
            <div className={noteClassses} style={{backgroundColor: color}}>
                <p className={textClasses} onClick={this.onEdit}>{this.shortenText(text)}</p>
                <NoteProperties onEdit={onUpdate} note={note}/>
            </div>
        );
    }
}

export default Note;