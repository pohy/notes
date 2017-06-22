import React, {Component} from 'react';
import ColorPicker from './ColorPicker.jsx';
import './NoteProperties.css';

class NoteProperties extends Component {
    edit = (method) => (...args) => {
        const {note, onEdit} = this.props;
        onEdit(note[method].apply(note, args));
    };

    render() {
        const {note: {color, archived}} = this.props;
        return (
            <div className="NoteProperties small-text">
                <ColorPicker className="property" onColorChange={this.edit('setColor')} color={color}/>
                <button className="archive property" onClick={this.edit('toggleArchived')}>
                    {archived ? 'Restore' : 'Archive'}
                </button>
            </div>
        );
    }
}

export default NoteProperties;