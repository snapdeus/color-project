import React, { Component } from "react";
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import withStyles from "@material-ui/styles/withStyles";
import styles from './styles/ColorPickerFormStyles'



class ColorPickerForm extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currentColor: "teal",
            newColorName: "",
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', (value) =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor)
        );
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,

        })
    }
    handleSubmit() {
        //instead of using instantValidate={false}, can also assign a new random color 
        // const newRandomColor = Math.floor(Math.random() * 16777215).toString(16);
        const newColor = { color: this.state.currentColor, name: this.state.newColorName }
        this.props.addNewColor(newColor);
        this.setState({
            newColorName: "",
            // currentColor: `#${ newRandomColor }`
        })

    }
    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex })
    }
    render() {
        const { paletteIsFull, classes } = this.props;
        const { newColorName, currentColor } = this.state;
        return (
            <div className={classes.picker} >
                <ChromePicker
                    className={classes.picker}
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                />
                <ValidatorForm onSubmit={this.handleSubmit} ref='form' instantValidate={false}>
                    <TextValidator
                        className={classes.colorNameInput}
                        value={newColorName}
                        name='newColorName'
                        variant='filled'
                        margin='normal'
                        placeholder="Color Name"
                        onChange={this.handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter a color name.', 'This name has already been used.', 'That color has already been used.']}
                    />
                    <Button
                        className={classes.addColor}
                        disabled={paletteIsFull}
                        variant='contained'
                        color='primary'
                        style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
                        type="submit"
                    >
                        {paletteIsFull ? "Palette Full" : "Add Color"}

                    </Button>
                </ValidatorForm>

            </div>
        );
    }
}


export default withStyles(styles)(ColorPickerForm);
