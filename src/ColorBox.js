import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'
import './ColorBox.css'


class ColorBox extends Component {
    constructor (props) {
        super(props);
        this.state = { copied: false }
        this.changeCopyState = this.changeCopyState.bind(this)
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500)
        })
    }

    render() {
        const { name, background, moreURL, showLink } = this.props
        const { copied } = this.state
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background }} className='ColorBox'>
                    <div className={`copy-overlay ${ copied && "show" }`} style={{ background }} />
                    <div className={`copy-msg ${ copied && "show" }`}>
                        <h1>copied!</h1>
                        <p>{this.props.background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">
                            Copy
                        </button>
                    </div>
                    {/* stop propagation is to keep the transition from including the copy effect */}
                    {showLink && (
                        <Link to={`/palette/${ moreURL }`} onClick={e => e.stopPropagation}>
                            <span className="see-more">MORE</span>
                        </Link>
                    )}


                </div>
            </CopyToClipboard>
        )
    }
}


export default ColorBox