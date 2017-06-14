import uuid from 'uuid/v4';

export default class Note {
    constructor(text = '') {
        this.id = uuid();
        this.created = new Date();
        this.text = text;
        this.archived = null;
        this.deleted = null;
    }

    toggleArchived() {
        this.archived = this.archived ? null : new Date();
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
