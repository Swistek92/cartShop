import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeal = async () => {
      setLoading(true);
      const response = await fetch(
        'https://lalalalalalalala-64dd5-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
      );

      if (!response.ok) {
        throw new Error('something went wrong');
        // setHttpError()
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setLoading(false);
    };

    fetchMeal().catch((error) => {
      setLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (loading) {
    return (
      <section className={classes.loading}>
        <p>Loading</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.error}>
        <p>httpError</p>
      </section>
    );
  }

  const mealList = meals.map((e) => (
    <MealItem
      key={e.id}
      id={e.id}
      name={e.name}
      description={e.description}
      price={e.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
