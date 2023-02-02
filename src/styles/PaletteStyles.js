const styles = {
    Palette: {
        height: "98vh",
        width: "99.5%",
        display: "flex",
        flexDirection: "column",
    },
    PaletteColors: {
        height: "90%"
    },
    goBack: {
        color: "white",
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-5px",
        opacity: "1",
        backgroundColor: "black",
        "& a": {
            color: "white",
            textDecoration: "none",
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            cursor: "pointer",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            background: "rgba(255,255,2555,.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            textTransform: "uppercase",
            border: "none",

        }
    }
}

export default styles