import React, {Component} from 'react';
import Note from './Note';
import './NoteInput.css';

class NoteInput extends Component {
    state = {
        note: ''
    };

    addNote = (event) => {
        if (event) {
            event.preventDefault();
        }
        const note = new Note(this.state.note);
        this.props.onNoteAdd(note);
        this.setState({note: ''});
        this.noteInput.focus();
    };

    onNoteInput = ({target: {value}}) => this.setState({note: value});

    render() {
        return (
            <form className="NoteInput" onSubmit={this.addNote}>
                <input
                    type="text"
                    placeholder="Note..."
                    onInput={this.onNoteInput}
                    value={this.state.note}
                    autoFocus
                    ref={(input) => { this.noteInput = input; }}
                />
                <button onClick={this.addNote}>Add</button>
            </form>
        );
    }
}

export default NoteInput;