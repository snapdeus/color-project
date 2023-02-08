import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker } from "emoji-mart";
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: true,
            newPaletteName: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,

        })
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, open, handleSubmit, hideForm } = this.props;
        const { newPaletteName } = this.state;
        return (


            <Dialog
                open={this.state.open}
                onClose={hideForm}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Choose a Palette name</DialogTitle>
                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a unique name for your new palette.
                        </DialogContentText>
                        <Picker />
                        <TextValidator
                            label="Palette Name"
                            name='newPaletteName'
                            onChange={this.handleChange}
                            fullWidth
                            margin='normal'
                            value={newPaletteName}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette Name", "Name already used."]}
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideForm} color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                        >
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>

        );
    }
}
export default PaletteMetaForm