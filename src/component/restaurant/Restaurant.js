import React from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../../style/Restaurant.scss';



export const GET_RESTAURANTS = gql`
  {
    restaurants {
      _id
      name
      slogan
      meals {
        _id
        name
      }
    }
  }
`;

const DELETE_RESTAURANT = gql`
    mutation deleteRestaurant($id: ID!) {
      deleteRestaurant(_id: $id)
    }
`;


export default function Restaurant(props) {

  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  const [deleteRestaurant] = useMutation(DELETE_RESTAURANT);

  const onDeleteRestaurant = (event, id) => {
    event.preventDefault();
    deleteRestaurant({
      variables: { id },
    });
    data.restaurants = data.restaurants.filter((restaurant) => restaurant._id !== id);
  };

  if (loading) {
    return (
      <Fragment>
        <div>Loading...</div>
      </Fragment>
    );
  }

  if (error) {
    return (
      <Fragment>
        <div>An error occured while retrieving restaurants from server.</div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className='Restaurant'>
        <div className='list-container'>
          <h2>Liste de tous les restaurants:</h2>
          <ul>
            {data.restaurants.map((restaurant) => (
              <Link
                key={restaurant._id}
                className='link-list-restaurant'
                to={{
                  pathname: `/restaurant/detail/${restaurant._id}`,
                  state: { restaurant },
                }}
              >
                <li key={restaurant._id} value={restaurant.name}>
                  <div>
                    <h3>{restaurant.name}</h3>
                  </div>
                  <div>
                    <Link
                      className='link'
                      to={{
                        pathname: `/restaurant/edit/${restaurant._id}`,
                        state: { restaurant },
                      }}
                    >
                      Modifier
                    </Link>
                    <Link
                      className='link'
                      onClick={(e) => onDeleteRestaurant(e, restaurant._id)}
                      to='/restaurants'
                    >
                      Supprimer
                    </Link>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className='add-restaurant-button-list'>
          <Link to='/restaurant/add' className='link'>
            Ajouter un restaurant
          </Link>
        </div>
      </div>
    </Fragment>
  );
}