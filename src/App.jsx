import React, {Component} from 'react';
import './App.css';
import Note from './Note';
import NoteComponent from './Note.jsx';
import NoteInput from './NoteInput.jsx';
import Masonry from 'react-masonry-component';

class App extends Component {
    static NOTES_KEY = 'notes';

    state = {
        notes: []
    };

    componentDidMount() {
        this.setState({notes: this.loadNotes()});
    }

    loadNotes() {
        const notesJSON = localStorage.getItem(App.NOTES_KEY);
        const notes = notesJSON ? (JSON.parse(notesJSON) || []).map(Note.fromData) : [];
        return this.sortNotes(notes);
    }

    sortNotes = (notes) => notes.sort((noteA, noteB) => noteA.created > noteB.created ? -1 : 1);

    updateNotes = (notes) => {
        localStorage.setItem(App.NOTES_KEY, JSON.stringify(notes));
        this.setState({notes: this.sortNotes(notes)});
    };

    updateNote = (newNote) => {
        const newNotes = this.state.notes.map((note) => note.id === newNote.id ? newNote : note);
        this.updateNotes(newNotes);
    };

    addNote = (note) => {
        const newNotes = this.state.notes.concat(note);
        this.updateNotes(newNotes);
    };

    renderNote = (note, i) => <NoteComponent key={i} note={note} onUpdate={this.updateNote}/>;

    render() {
        const {notes} = this.state;
        const masonryOptions = {
            itemSelector: '.Note',
            fitWidth: true
        };
        return (
            <div className="App">
                <NoteInput onNoteAdd={this.addNote}/>
                <Masonry className="notes" options={masonryOptions}>
                    {notes.filter(({archived}) => !archived).map(this.renderNote)}
                </Masonry>
            </div>
        );
    }
}

export default App;