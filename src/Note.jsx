import React, {Component} from 'react';
import './Note.css';
import ColorPicker from './ColorPicker.jsx';

class Note extends Component {
    static SMALL_TEXT_LENGTH = 14;
    static MAX_TEXT_LENGTH = 140;

    archive = () => {
        const {note, onUpdate} = this.props;
        onUpdate(note.toggleArchived());
    };

    changeColor = (color) => {
        const {note, onUpdate} = this.props;
        onUpdate(note.setColor(color));
    };

    shortenText = (text) => text.length > Note.MAX_TEXT_LENGTH ? text.substring(0, Note.MAX_TEXT_LENGTH) + '...' : text;

    onEdit = () => this.props.onEdit(this.props.note);

    render() {
        const {note: {text, archived, color}} = this.props;
        const noteClassses = `Note ${archived ? 'archived' : ''}`;
        const textClasses = `text ${text.length > Note.SMALL_TEXT_LENGTH ? 'small-text' : ''}`;
        return (
            <div className={noteClassses} style={{backgroundColor: color}}>
                <p className={textClasses} onClick={this.onEdit}>{this.shortenText(text)}</p>
                <div className="controls">
                    <ColorPicker onColorChange={this.changeColor} {...{color}}/>
                    <div className="small-text">
                        <button className="archive" onClick={this.archive}>{archived ? 'Restore' : 'Archive'}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Note;