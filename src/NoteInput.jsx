import React, {Component} from 'react';
import Note from './Note';
import './NoteInput.css';

class NoteInput extends Component {
    state = {
        noteText: '',
        focused: false
    };

    componentWillReceiveProps({editedNote}) {
        if (editedNote) {
            this.setState({
                noteText: editedNote.text,
                focused: true
            });
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
        this.setState({
            noteText: '',
            focused: false
        });
    };

    setFocus = (focusValue) => () => {
        const {editedNote} = this.props;
        this.setState({focused: editedNote && focusValue});
        // When note is being edited, and focus is lost
        if (editedNote && this.state.focused && !focusValue) {
            this.cancel();
        }
    };

    render() {
        const noteInputClasses = `NoteInput ${this.state.focused ? 'focused' : ''}`;
        return (
            <form className={noteInputClasses} onSubmit={this.addNote}>
                {/*TODO: what about scrolling and overlay?*/}
                <input
                    type="text"
                    placeholder="Note..."
                    onInput={this.onNoteInput}
                    value={this.state.noteText}
                    autoFocus
                    ref={(input) => { this.noteInput = input; }}
                    onKeyUp={this.onKey}
                    onFocus={this.setFocus(true)}
                    onBlur={this.setFocus(false)}
                />
                <button onClick={this.addNote}>{this.props.editedNote ? 'Update' : 'Add'}</button>
            </form>
        );
    }
}

export default NoteInput;