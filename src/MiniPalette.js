import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles/MiniPaletteStyles'


function MiniPalette(props) {
    //just "props" because we are in a functional component not a class based component
    const { classes, paletteName, emoji, colors } = props;
    const miniColorBoxes = colors.map(color => (
        <div
            className={classes.miniColor}
            style={{ backgroundColor: color.color }}
            key={color.name}
        />
    ))

    return (
        <div className={classes.root} onClick={props.handleClick}>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                {paletteName}<span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    )

}

export default withStyles(styles)(MiniPalette)