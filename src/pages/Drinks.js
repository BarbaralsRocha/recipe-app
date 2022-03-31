import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import Card from '../components/Card';
import RecipeSearchDrink from '../components/RecipeSearchDrink';
import { getDrinksThunk } from '../Redux/actions/drinks';
import { getDrinksCategoriesThunk } from '../Redux/actions/drinksCategories';

const LIMIT_DRINKS = 12;
const LIMIT_CATEGORIES = 5;

const Drinks = () => {
  const dispatch = useDispatch();

  const {
    drinks,
    isFetching: isFetchingDrinks,
  } = useSelector((state) => state.drinks);
  const {
    categories,
    isFetching: isFetchingCategories,
  } = useSelector((state) => state.drinksCategories);
  const { drinks: searchedDrinks } = useSelector((state) => state.recipeSearch);
  const { drinks: drinkByIngredients } = useSelector((state) => state.byIngredientsDrink);

  const twelveDrinks = drinks.slice(0, LIMIT_DRINKS);
  const drinkCategories = categories.slice(0, LIMIT_CATEGORIES);
  const twelveSearched = searchedDrinks?.slice(0, LIMIT_DRINKS);
  const twelveByIngredients = drinkByIngredients?.slice(0, LIMIT_DRINKS);

  useEffect(() => {
    dispatch(getDrinksThunk());
    dispatch(getDrinksCategoriesThunk());
  }, [dispatch]);

  return (
    <Layout title="Drinks">
      {/* Sugestão: Talvez seja interessante criar um componente */}
      <div>
        {
          isFetchingCategories ? <Loading />
            : drinkCategories.map((category) => (
              <span key={ category.strCategory }>
                <button
                  type="button"
                  data-testid={ `${category.strCategory}-category-filter` }
                >
                  { category.strCategory }
                </button>
              </span>))
        }
      </div>
      {isFetchingDrinks && <Loading />}
      {
        !twelveSearched && !twelveByIngredients
          && twelveDrinks.map((drink, index) => (
            <Link key={ drink.idDrink } to={ `/drinks/${drink.idDrink}` }>
              <Card
                index={ index }
                image={ drink.strDrinkThumb }
                title={ drink.strDrink }
              />
            </Link>
          ))
      }
      {
        /* TODO -> pensar sobre reutilizar o componente de Card
        não é necessário o uso deste componente RecipeSearchDrink */
        (twelveSearched || twelveByIngredients)
          && (
            <RecipeSearchDrink
              recipes={ twelveSearched || twelveByIngredients }
            />
          )
      }
    </Layout>
  );
};

export default Drinks;
