import React, {Component} from 'react';
import './Note.css';

class Note extends Component {
    static SMALL_TEXT_LENGTH = 14;
    static MAX_TEXT_LENGTH = 140;

    archive = () => {
        const {note, onUpdate} = this.props;
        onUpdate(note.toggleArchived());
    };

    shortenText = (text) => text.length > Note.MAX_TEXT_LENGTH ? text.substring(0, Note.MAX_TEXT_LENGTH) + '...' : text;

    render() {
        const {note: {text, archived}} = this.props;
        const noteClassses = `Note ${archived ? 'archived' : ''}`;
        const textClasses = `text ${text.length > Note.SMALL_TEXT_LENGTH ? 'small' : ''}`;
        return (
            <div className={noteClassses}>
                <p className={textClasses}>{this.shortenText(text)}</p>
                <div className="controls">
                    <button className="archive" onClick={this.archive}>{archived ? 'Restore' : 'Archive'}</button>
                </div>
            </div>
        );
    }
}

export default Note;