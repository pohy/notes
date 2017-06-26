import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NoteInput from './NoteInput.jsx';
import Note from './Note';
import NoteProperties from "./NoteProperties";
import './NoteEditor.css';

class NoteEditor extends Component {
    static propTypes = {
        note: PropTypes.instanceOf(Note).isRequired,
        onEdit: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

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

    submitNote = (...args) => {
        const {note, onSubmit} = this.props;
        this.updateNoteProperty('text')(args);
        onSubmit(note);
    };

    render() {
        const {note, onEdit} = this.props;

        return (
            <div className="NoteEditor">
                <NoteInput onSubmit={this.submitNote} note={note}/>
                <NoteProperties {...{note, onEdit}}/>
            </div>
        );
    }
}

export default NoteEditor;