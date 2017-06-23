import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NoteInput from './NoteInput.jsx';
import Note from './Note';

class NoteEditor extends Component {
    static propTypes = {
        note: PropTypes.instanceOf(Note).isRequired,
        onEdit: PropTypes.func.isRequired
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

    render() {
        return (
            <div className="NoteEditor">
                <NoteInput onSubmit={this.updateNoteProperty('text')} note={this.props.note}/>
            </div>
        );
    }
}

export default NoteEditor;