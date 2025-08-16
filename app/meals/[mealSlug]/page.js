import classes from './page.module.css';
import Image from 'next/image';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';

// define generateMetatdata (reserved function)
export async function generateMetadata({ params }) {
    // After Next.js 13+ App Router setup, params is now asynchronous
    const { mealSlug } = await params;
    const meal = getMeal(mealSlug);
    if (!meal) {
        // Calling this function will stop this component from executing and will show the closest not-found or error page
        notFound();
    }
    return {
        title: meal.title,
        description: meal.summary,
    };
}

export default async function MealDetailsPage({ params }) {
    // After Next.js 13+ App Router setup, params is now asynchronous
    const { mealSlug } = await params;
    const meal = getMeal(mealSlug);
    if (!meal) {
        // Calling this function will stop this component from executing and will show the closest not-found or error page
        notFound();
    }
    meal.instructions = meal.instructions.replace(/\n/g, '<br />');
    
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
                <p className={classes.instructions}
                dangerouslySetInnerHTML={{
                    __html: meal.instructions,
                }}></p>
            </main>
        </>
    );
}