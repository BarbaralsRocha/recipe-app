import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import { foodByIngredient } from '../Redux/actions';

const MAX_INGREDIENTS = 12;

const Ingredients = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const ingredientes = async () => {
      const endpointAPIIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const { meals } = await fetch(endpointAPIIngredients)
        .then((response) => response.json());
      const filtered = meals.reduce((acc, curl, index) => {
        if (index < MAX_INGREDIENTS) acc.push(curl);
        return acc;
      }, []);
      setIngredients(filtered);
    };
    ingredientes();
  }, []);

  const handleClickCard = (searchIngredient) => {
    dispatch(foodByIngredient(searchIngredient));
    history.push('/foods');
  };

  return (

    <Layout title="Explore Ingredients">
      {
        ingredients && ingredients.map((ingredient, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => handleClickCard(ingredient.strIngredient) }
          >

            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              alt="ingredient"
            />
            <p data-testid={ `${index}-card-name` }>{ingredient.strIngredient}</p>

          </button>
        ))
      }
    </Layout>
  );
};

export default Ingredients;
