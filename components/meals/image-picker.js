'use client'
import { useRef, useState } from 'react';
import Image from 'next/image'
import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
    // useState to handle picked image and show preview
    const [pickedImage, setPickedImage] = useState();
    // useRef to connect to a HTML element
    const imageInput = useRef();
    // A function to handle when user clicks the button
    function handlePickClick() {
        imageInput.current.click();
    }
    function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        /* readAsDataURL() kicks off the read process.
        onload runs after the read is complete.
        If you want to work with the file content, do it inside onload (or in a Promise/async wrapper). */
        const fileReader = new FileReader();
        
        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }

        fileReader.readAsDataURL(file);
    }
    return (
    <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage && <p>No image picked yet.</p>}
                {pickedImage && (
                    <Image
                        src={pickedImage}
                        alt="The image selected by the user."
                        fill
                    />
                )}
            </div>
            <input 
            className={classes.input}
            type="file"
            id={name}
            accept="image/png, image/jpeg"
            name={name}
            ref={imageInput}
            onChange={handleImageChange}
            required
            />
            <button className={classes.button} type="button" onClick={handlePickClick}>
                Pick an Image
            </button>
        </div>
    </div>
    ) 
}