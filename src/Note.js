import uuid from 'uuid/v4';

export default class Note {
    static COLORS = {
        WHITE: 'white',
        YELLOW: 'lightyellow',
        GREEN: 'lightgreen',
        SALMON: 'lightsalmon',
        BLUE: 'lightblue',
        CORAL: 'lightcoral',
        PINK: 'lightpink'
    };

    constructor(text = '') {
        this.id = uuid();
        this.created = new Date();
        this.text = text;
        this.archived = null;
        this.deleted = null;
        this.color = Note.COLORS.WHITE;
    }

    toggleArchived() {
        this.archived = this.archived ? null : new Date();
        return this;
    }

    setColor(color) {
        if (!Object.values(Note.COLORS).includes(color)) {
            console.error(`Color '${color}' is not supported.`);
        } else {
            this.color = color;
        }
        return this;
    }

    static fromData(data) {
        const note = new Note();
        Object
            .keys(note)
            .forEach((key) => {
                let value = data[key];
                const date = Date.parse(value);
                note[key] = Number.isNaN(date) ? value : new Date(date)
            });
        return note;
    }
}
