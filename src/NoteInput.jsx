import React, {Component} from 'react';
import Note from './Note';
import './NoteInput.css';

class NoteInput extends Component {
    state = {
        noteText: ''
    };

    componentWillReceiveProps({editedNote}) {
        if (editedNote) {
            this.setState({noteText: editedNote.text});
            this.noteInput.focus();
        }
    }

    addNote = (event) => {
        if (event) {
            event.preventDefault();
        }
        const {editedNote} = this.props;
        const {noteText} = this.state;
        const note = editedNote
                ? Note.fromData({...editedNote, text: noteText})
                : new Note(noteText);
        this.props.onNoteAdd(note);
        this.setState({noteText: ''});
        this.noteInput.focus();
    };

    onNoteInput = ({target: {value}}) => this.setState({noteText: value});

    onKey = ({key}) => key === 'Escape' ? this.cancel() : undefined;

    cancel = () => {
        const {editedNote} = this.props;
        if (editedNote) {
            this.props.onNoteAdd(editedNote);
        }
        this.setState({noteText: ''});
    };

    render() {
        return (
            <form className="NoteInput" onSubmit={this.addNote}>
                <input
                    type="text"
                    placeholder="Note..."
                    onInput={this.onNoteInput}
                    value={this.state.noteText}
                    autoFocus
                    ref={(input) => { this.noteInput = input; }}
                    onKeyUp={this.onKey}
                />
                <button onClick={this.addNote}>{this.props.editedNote ? 'Update' : 'Add'}</button>
            </form>
        );
    }
}

export default NoteInput;