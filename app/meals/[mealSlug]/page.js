import classes from './page.module.css';
import Image from 'next/image';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

// define generateMetatdata (reserved function)
export async function generateMetadata({ params }) {
    // After Next.js 13+ App Router setup, params is now asynchronous
    // const { mealSlug } = await params;
    try {
        const meal = await getMeal(params.mealSlug); // Await getMeal
        if (!meal || !meal.title) {
            notFound();
        }
        return {
            title: meal.title,
            description: meal.summary,
        };
    } catch (error) {
    console.error('generateMetadata error:', error);
    notFound(); // Or return default metadata
    }
}

export default async function MealDetailsPage({ params }) {
    // After Next.js 13+ App Router setup, params is now asynchronous
    // const { mealSlug } = await params;
    let meal;
    try {
        meal = await getMeal(params.mealSlug); // Await getMeal
        if (!meal || !meal.title) {
        notFound();
        }
    } catch (error) {
        console.error('MealDetailsPage error:', error);
        return <div>Error loading meal. Please try again later.</div>;
    }
    // meal.instructions = meal.instructions.replace(/\n/g, '<br />');
    // Split instructions into lines and render as JSX
  const instructions = meal.instructions.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
    
    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={`https://cshih685-nextjs-gourmet.s3.us-east-2.amazonaws.com/${meal.image}`} alt={meal.title} fill />                    
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions}>{instructions}</p>
            </main>
        </>
    );
}