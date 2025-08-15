'use server'

import { redirect } from "next/navigation";
import { saveMeal } from "./meals"


function isInvalidTest(test) {
    return !test || test.trim() === '';
}

// Because of useFormState, it will pass two parameters when the form gets submitted
 export async function shareMeal(prevState, formData) {
        const meal = {
            title: formData.get('title'),
            summary: formData.get('summary'),
            instructions: formData.get('instructions'),
            image: formData.get('image'),
            creator: formData.get('name'),
            creator_email: formData.get('email')
        };

        if (
            isInvalidTest(meal.title) ||
            isInvalidTest(meal.summary) ||
            isInvalidTest(meal.instructions) ||
            isInvalidTest(meal.creator) ||
            isInvalidTest(meal.creator_email) ||
            !meal.creator_email.includes('@') ||
            !meal.image || meal.image.size === 0
        ) {
            return {
                message: 'Invalid input.'
            }
        }

        // console.log(meal); //Won't see log on the browser, instead seeing it on the server
        await saveMeal(meal);
        // After successfully saved meal, redirect to all meals page
        redirect('/meals');
    }