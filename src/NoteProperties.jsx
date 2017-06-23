import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ColorPicker from './ColorPicker.jsx';
import Note from './Note';
import './NoteProperties.css';

class NoteProperties extends Component {
    static propTypes = {
        note: PropTypes.instanceOf(Note).isRequired,
        onEdit: PropTypes.func.isRequired
    };

    edit = (method) => (...args) => {
        const {note, onEdit} = this.props;
        onEdit(note[method].apply(note, args));
    };

    render() {
        const {note: {color, archived}} = this.props;
        return (
            <div className="NoteProperties small-text">
                <ColorPicker className="property" onColorChange={this.edit('setColor')} color={color}/>
                <button className="property" onClick={this.edit('toggleArchived')}>
                    {archived ? 'Restore' : 'Archive'}
                </button>
                <button className="property" onClick={this.edit('remove')}>
                    Remove
                </button>
            </div>
        );
    }
}

export default NoteProperties;