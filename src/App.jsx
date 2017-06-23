import React, {Component} from 'react';
import './App.css';
import Note from './Note';
import NoteComponent from './Note.jsx';
import Masonry from 'react-masonry-component';
import {NavLink, Route} from 'react-router-dom';
import NoteEditor from './NoteEditor.jsx';

class App extends Component {
    static NOTES_KEY = 'notes';

    state = {
        notes: [],
        editedNote: new Note()
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
        this.setState({
            notes: this.sortNotes(notes),
            editedNote: new Note()
        });
    };

    updateNote = (newNote) => {
        const {notes} = this.state;
        const existingNote = notes.find((note) => note.id === newNote.id);
        const newNotes = existingNote
                ? notes.map((note) => note.id === newNote.id ? newNote : note)
                : notes.concat(newNote);
        this.updateNotes(newNotes);
    };

    renderNote = (note, i) => <NoteComponent key={i} note={note} onUpdate={this.updateNote}/>;

    renderNotes = (filter) => () => {
        const masonryOptions = {
            itemSelector: '.Note',
            fitWidth: true
        };
        return (
            <Masonry className="notes" options={masonryOptions}>
                {this.state.notes.filter(filter).map(this.renderNote)}
            </Masonry>
        );
    };

    render() {
        return (
            <div className="App">
                <ul className="menu">
                    <li><NavLink className="middle-text" exact to="/">Notes</NavLink></li>
                    <li><NavLink className="middle-text" to="/archived">Archived</NavLink></li>
                </ul>
                <div className="content">
                    <NoteEditor onEdit={this.updateNote} note={this.state.editedNote}/>
                    <Route exact path="/" render={this.renderNotes(({archived}) => !archived)}/>
                    <Route path="/archived" render={this.renderNotes(({archived}) => !!archived)}/>
                </div>
            </div>
        );
    }
}

export default App;
