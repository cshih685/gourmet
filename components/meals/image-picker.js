'use client'
import { useRef } from 'react';
import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
    // useRef to connect to a HTML element
    const imageInput = useRef();
    // A function to handle when user clicks the button
    function handlePickClick() {
        imageInput.current.click();
    }
    return (
    <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <input className={classes.input}
            type="file"
            id={name}
            accept="image/png, image/jpeg"
            name={name}
            ref={imageInput}
            />
            <button className={classes.button} type="button" onClick={handlePickClick}>
                Pick an Image
            </button>
        </div>
    </div>
    ) 
}