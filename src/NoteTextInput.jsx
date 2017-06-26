import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import './NoteTextInput.css';

class NoteTextInput extends Component {
    static propTypes = {
        note: PropTypes.instanceOf(Note).isRequired,
        onSubmit: PropTypes.func.isRequired,
        onUpdate: PropTypes.func.isRequired
    };


    onInput = ({target: {value}}) => {
        this.props.onUpdate(value);
    }

    submit = ({key}) => {
        const {onSubmit, note: {text}} = this.props;
        if (['Escape', 'Enter'].includes(key) && !!text) {
            onSubmit();
        }
    };

    render() {
        return (
            <input
                className="NoteTextInput"
                type="text"
                placeholder="Note..."
                onInput={this.onInput}
                value={this.props.note.text}
                autoFocus
                onKeyUp={this.submit}
            />
        );
    }
}

export default NoteTextInput;
