import React, { Component } from 'react'

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


    render() {
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
    
            </div>
        )
    }
}
