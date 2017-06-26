import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import './NoteTextInput.css';

class NoteTextInput extends Component {
    static propTypes = {
        note: PropTypes.instanceOf(Note).isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    state = {
        noteText: ''
    };

    componentDidMount() {
        this.noteTextFromNote(this.props.note);
    }

    componentWillReceiveProps(nextProps) {
        this.noteTextFromNote(nextProps.note);
    }

    noteTextFromNote(note) {
        if (note) {
            this.setState({noteText: note.text});
            this.noteInput.focus();
        }
    }

    onInput = ({target: {value}}) => this.setState({noteText: value});

    submit = ({key}) => {
        if (['Escape', 'Enter'].includes(key) && !!this.state.noteText) {
            this.props.onSubmit(this.state.noteText);
        }
    };

    render() {
        return (
            <input
                className="NoteTextInput"
                type="text"
                placeholder="Note..."
                onInput={this.onInput}
                value={this.state.noteText}
                autoFocus
                ref={(input) => { this.noteInput = input; }}
                onKeyUp={this.submit}
            />
        );
    }
}

export default NoteTextInput;
