import React, { Component } from 'react'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import styles from './styles/NewPaletteFormStyles';
import { Button } from '@material-ui/core';
import { arrayMove } from 'react-sortable-hoc';

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor (props) {
        super(props);
        this.state = {
            open: true,
            currentColor: "teal",
            newColorName: "",
            colors: this.props.palettes[0].colors,
            newPaletteName: ""
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.randomColor = this.randomColor.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
            this.state.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', (value) =>
            this.state.colors.every(
                ({ color }) => color !== this.state.currentColor)
        );
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
        );
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex })
    }
    addNewColor() {
        const newColor = { color: this.state.currentColor, name: this.state.newColorName }
        this.setState({ colors: [...this.state.colors, newColor], newColorName: "" })
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,

        })
    }

    handleSubmit() {
        let newName = this.state.newPaletteName
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, "-"),
            colors: this.state.colors
        }
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    }

    removeColor(colorName) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    };
    clearColors() {
        this.setState({ colors: [] });
    };
    randomColor() {
        const allColors = this.props.palettes.map(p => p.colors).flat();
        let rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        this.setState({ colors: [...this.state.colors, randomColor] })
    };

    render() {
        const { classes, maxColors } = this.props;
        const { open, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color='default'
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={this.handleSubmit}>
                            <TextValidator
                                label="Palette Name"
                                name='newPaletteName'
                                onChange={this.handleChange}
                                value={this.state.newPaletteName}
                                validators={["required", "isPaletteNameUnique"]}
                                errorMessages={["Enter Palette Name", "Name already used."]}
                            />
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                            >
                                Save Palette
                            </Button>
                        </ValidatorForm>

                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Typography variant='h5'>Design Your Palette</Typography>
                    <div>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={this.clearColors}
                        >
                            Clear Palette
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={this.randomColor}
                        >
                            Random Color
                        </Button>
                    </div>
                    <ChromePicker
                        color={this.state.currentColor}
                        onChangeComplete={this.updateCurrentColor}
                    />
                    <ValidatorForm onSubmit={this.addNewColor}>
                        <TextValidator
                            value={this.state.newColorName}
                            name='newColorName'
                            onChange={this.handleChange}
                            validators={['required', 'isColorNameUnique', 'isColorUnique']}
                            errorMessages={['Enter a color name.', 'This name has already been used.', 'That color has already been used.']}
                        />
                        <Button
                            disabled={paletteIsFull}
                            variant='contained'
                            color='primary'
                            style={{ backgroundColor: paletteIsFull ? "grey" : this.state.currentColor }}
                            type="submit"
                        >
                            {paletteIsFull ? "Palette Full" : "Add Color"}

                        </Button>
                    </ValidatorForm>

                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />


                    <DraggableColorList
                        colors={colors}
                        removeColor={this.removeColor}
                        axis='xy'
                        onSortEnd={this.onSortEnd}
                    />

                </main>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);