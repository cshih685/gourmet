'use client'
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { useFormState } from 'react-dom';
import { useActionState } from 'react';

export default function ShareMealPage() {
    // useFormState has been renamed to useActionState
    // useFormState hook is manaing the state of this page or of this component, 
    // which uses a form that will be submitted with help of Server Actions
    // 2 Input arguments - 
        // 1. Actual action will be triggered when the form is submitted (shareMeal here)
        // 2. initial state of this component (initial value should be returned by useFormState)
    // 2 Output elements we will get values -
        // 1. Current State (response) of this comopnent or the initial state if no response has been received yet.
        // 2. formAction
    const [state, formAction] = useActionState(shareMeal, {message: null});
    // Now useFormState can basically step in and manage that state for this compnent 
    // and that state depends on the execution of that Server Action and its response
    // In this case, I know the state will either be object with message:'Invalid inpu' or message: null
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}