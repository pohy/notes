import React, {Component} from 'react';
import './ColorPicker.css';
import Note from './Note';

class ColorPicker extends Component {
    onColor = (color) => () => this.props.onColorChange(color);

    renderColorButton = (color, i) => {
        return (
            <button
                key={i}
                style={{backgroundColor: color}}
                onClick={this.onColor(color)}
                className={`${this.props.color === color ? 'chosen' : ''}`}
            >
                &nbsp;
            </button>
        );
    };

    render() {
        return (
            <div className="ColorPicker small-text">
                <button className="color">Color</button>
                <div className="palette-wrapper">
                    <div className="palette">
                        {Object.values(Note.COLORS).map(this.renderColorButton)}
                    </div>
                </div>
            </div>
        );
    }
}

export default ColorPicker;