import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NoteTextInput from './NoteTextInput.jsx';
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

    submitNote = () => {
        const {note, onSubmit} = this.props;
        onSubmit(note);
    };

    render() {
        const {note, onEdit, note: {color}} = this.props;

        return (
            <div className="NoteEditor" style={{backgroundColor: color}}>
                <NoteTextInput onSubmit={this.submitNote} onUpdate={this.updateNoteProperty('text')} note={note}/>
                <NoteProperties {...{note, onEdit}}/>
            </div>
        );
    }
}

export default NoteEditor;