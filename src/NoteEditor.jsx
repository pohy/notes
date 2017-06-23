import React, {Component} from 'react';
import NoteInput from './NoteInput.jsx';

class NoteEditor extends Component {
    updateNoteProperty = (property) => (...args) => {
        const {note, onEdit} = this.props;
        // TODO: solve this in an immutable way
        if (typeof note[property] === 'function') {
            note[property].apply(note, args);
        } else {
            note[property] = args[0];
        }
        onEdit(note);
    };

    render() {
        return (
            <div className="NoteEditor">
                <NoteInput onSubmit={this.updateNoteProperty('text')} note={this.props.note}/>
            </div>
        );
    }
}

export default NoteEditor;