import React, { Component } from 'react'
import 'rc-slider/assets/index.css';
import './Navbar.css'
import { Link } from 'react-router-dom'
import Slider, { Range } from 'rc-slider';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class Navbar extends Component {
    constructor (props) {
        super(props);
        this.state = { format: 'hex', open: false }
        this.handleFormatChange = this.handleFormatChange.bind(this)
        this.closeSnackbar = this.closeSnackbar.bind(this)
    }
    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true });
        this.props.handleChange(e.target.value)
    }
    closeSnackbar() {
        this.setState({ open: false })
    }
    render() {
        const { level, changeLevel } = this.props;
        const { format } = this.state
        return (
            <header className="Navbar">
                <div className="logo">
                    <Link to={'/'}>reactcolorpicker</Link>
                </div>
                <div className="slider-container">
                    <span>Level: {level}</span>
                    <div className="slider">
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={changeLevel}
                            trackStyle={[{ backgroundColor: "transparent" }]}
                            handleStyle={[
                                {
                                    backgroundColor: "green",
                                    outline: "none",
                                    border: "2px solid green",
                                    boxShadow: "none",
                                    width: "13px",
                                    height: "13px",
                                    marginLeft: "-7px",
                                    marginTop: "-3px",
                                },
                            ]}
                            railStyle={{ height: "8" }}
                        />

                    </div>
                </div>
                <div className="select-container">
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - RGB(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - RGBA(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={this.state.open}
                    autoHideDuration={2000}
                    message={<span id="message-id">Format Changed to {format.toUpperCase()}</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton onClick={this.closeSnackbar} color='inherit' key="close" aria-label="close">
                            <CloseIcon />
                        </IconButton>

                    ]}
                />
            </header>
        )
    }
}


export default Navbar