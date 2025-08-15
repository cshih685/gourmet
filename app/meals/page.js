import MealsGrid from '@/components/meals/meals-grid';
import classes from './page.module.css';
import Link from 'next/link';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

//outsource data fetching, then we can wrap it inside Suspense component
async function Meals() {
    // Since Next is React Server Component, we can directly call SQLite
    const meals = await getMeals();
    return <MealsGrid meals={meals} />
}


export default function MealsPage() {
    return <>
        <header className={classes.header}>
            <h1>
                Delicious meals, created{''}
                <span className={classes.highlight}>by you</span>
            </h1>
            <p>
                Choose your favorite recipe and cook it yourself. It is easy and fun!
            </p>
            <p className={classes.cta}>
                <Link href="/meals/share">
                    Share Your Favorite Recipe
                </Link>
            </p>
        </header>
        <main>
            {/* setup fallback prop to define the content should be shown while the wrapped component is loading some data 
            Here we can return loading content while the Meals component is still loading*/}
            <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                <Meals />
            </Suspense>
        </main>
    </>
}