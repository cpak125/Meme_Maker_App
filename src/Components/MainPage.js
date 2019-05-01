import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, FormGroup, Label, NavbarBrand } from 'reactstrap'

const photos = [
    { src: '/images/boy.png' },
    { src: '/images/crying.png' },
    { src: '/images/dank.png' },
    { src: '/images/devilgirl.jpg' },
    { src: '/images/dog.png' },
    { src: '/images/doubt.png' },
    { src: '/images/frust.png' },
    { src: '/images/fry.jpg' },
    { src: '/images/bird.png' },
    { src: '/images/jobs.jpg' },
    { src: '/images/ned.jpeg' },
    { src: '/images/oldie.png' },
    { src: '/images/one-does-not.jpg' },
    { src: '/images/penguin.png' },
    { src: '/images/phone.jpg' },
    { src: '/images/sad.png' },
    { src: '/images/sponge.png' },
    { src: '/images/trump.jpg' },
    { src: '/images/vict-baby.png' },
    { src: '/images/seal.png' },
    { src: '/images/wolf.png' },
]

const initialState = {
    topText: "", // Top caption of the meme
    bottomText: "", // Bottom caption of the mem
    isTopDragging: false, // Checking whether top text is repositioned
    isBottomDragging: false, // Checking whether bottom text is repositioned
    // X and Y coordinates of the top caption
    topY: "10%",
    topX: "50%",
    // X and Y coordinates od the bottom caption
    bottomX: "50%",
    bottomY: "90%"
}

export default class MainPage extends Component {
    state = {
        currentImage: 0,
        modalIsOpen: false,
        currentImageBase64: null,
        // Setting the initialState properties to the state object
        ...initialState
    }

    getBase64Image = (img) => {
        // This function converts the image to data URI
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const context = canvas.getContext("2d")
        context.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL("image/png")
        return dataURL
    }

    openImage = (index) => {
        const image = photos[index]
        const baseImage = new Image()
        baseImage.src = image.src
        const currentImageBase64 = this.getBase64Image(baseImage)
        // Setting the currently selected image on the state
        this.setState(prevState => ({
            currentImage: index,
            modalIsOpen: !prevState.modalIsOpen,
            currentImageBase64,
            ...initialState
        }))
    }

    toggle = () => {
        this.setState(prevState => ({
          modalIsOpen: !prevState.modalIsOpen
        }));
      }


    render() {
        const image = photos[this.state.currentImage]
        const baseImage = new Image()
        baseImage.src = image.src
        // To avoid stretching and compressing each image, fix the aspect ratio.
        // Fix the width to 600 and calculate height based on width-height ratio
        const wrh = baseImage.width / baseImage.height
        const newWidth = 600
        const newHeight = newWidth / wrh
        const textStyle = {
            fontFamily: "Impact",
            fontSize: "50px",
            textTransform: "uppercase",
            fill: "#FFF",
            stroke: "#000",
            userSelect: "none"
        }


        return (
            <div className="content">
                {/* Create the image gallery here! */}
                {photos.map((image, index) => (
                    <div className="image-holder" key={image.src}>
                        <span className="meme-top-caption">Top text</span>
                        <img
                            style={{
                                width: "100%",
                                cursor: "pointer",
                                height: "100%"
                            }}
                            alt={index}
                            src={image.src}
                            // The onClick here determines current image
                            onClick={() => this.openImage(index)}
                            role="presentation"
                        />
                        <span className="meme-bottom-caption">Bottom text</span>
                    </div>
                ))}

                {/*  The workstation/modal for meme creation */}
                <Modal className="meme-gen-modal" isOpen={this.state.modalIsOpen}>
                    <ModalHeader toggle={this.toggle}>Make-a-Meme</ModalHeader>
                    <ModalBody>
                        <svg
                            width={newWidth}
                            id="svg_ref"
                            height={newHeight}
                            ref={el => { this.svgRef = el }}
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink">
                            <image
                                ref={el => { this.imageRef = el }}
                                xlinkHref={this.state.currentImageBase64}
                                height={newHeight}
                                width={newWidth}
                            />
                            <text
                                style={{ ...textStyle, zIndex: this.state.isTopDragging ? 4 : 1 }}
                                x={this.state.topX}
                                y={this.state.topY}
                                dominantBaseline="middle"
                                textAnchor="middle"
                                onMouseDown={event => this.handleMouseDown(event, 'top')}
                                onMouseUp={event => this.handleMouseUp(event, 'top')}
                            >
                                {this.state.toptext}
                            </text>
                            <text
                                style={textStyle}
                                dominantBaseline="middle"
                                textAnchor="middle"
                                x={this.state.bottomX}
                                y={this.state.bottomY}
                                onMouseDown={event => this.handleMouseDown(event, 'bottom')}
                                onMouseUp={event => this.handleMouseUp(event, 'bottom')}
                            >
                                {this.state.bottomtext}
                            </text>
                        </svg>
                        <div className="meme-form">
                            <FormGroup>
                                <Label for="toptext">Top Text</Label>
                                <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="bottomtext">Bottom Text</Label>
                                <input className="form-control" type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={this.changeText} />
                            </FormGroup>
                            <button onClick={() => this.convertSvgToImage()} className="btn btn-primary">Download Meme!</button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
