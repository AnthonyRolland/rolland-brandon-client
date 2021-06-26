import { useMutation } from '@apollo/react-hooks';
import React from "react";
import { Fragment, useState } from 'react';
import gpl from 'graphql-tag';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { GET_RESTAURANTS } from './Restaurant';
import '../../style/EditRestaurant.scss';
import { Link } from 'react-router-dom';

const UPDATE_RESTAURANT = gpl`
  mutation updateRestaurant($id: ID!, $restaurantInput: RestaurantInput!) {
        updateRestaurant(_id: $id, input: $restaurantInput)
    }
`;

export default function EditRestaurant(props) {
  let {
    state: { restaurant },
  } = useLocation();
  const [formData, setFormData] = useState({ ...restaurant });
  const history = useHistory();
  const [updateRestaurant] = useMutation(UPDATE_RESTAURANT);

  const getData = (key) => (formData.hasOwnProperty(key) ? formData[key] : '');

  const setData = (key, value) => setFormData({ ...formData, [key]: value });

  const onSubmitForm = (event) => {
    event.preventDefault();
    updateRestaurant({
      variables: {
        id: restaurant._id,
        restaurantInput: {
          name: getData('name'),
          slogan: getData('slogan'),
        },
      },
      refetchQueries: [{ query: GET_RESTAURANTS }],
    }).then((unusedResponse) => history.push('/restaurants'));
  };

  return (
    <Fragment>
      <div className='EditRestaurant'>
        <h2>Modifier le restaurant:</h2>
        <div>
          <form onSubmit={onSubmitForm}>
            <div className='name-input'>
              <label>Name:</label>
              <input
                name='name'
                type='text'
                required
                placeholder='Nom'
                value={getData('name')}
                onChange={(e) => setData('name', e.target.value)}
              />
            </div>
            <div className='slogan-input'>
              <label>Slogan:</label>
              <input
                name='slogan'
                type='text'
                required
                placeholder='Slogan'
                value={getData('slogan')}
                onChange={(e) => setData('slogan', e.target.value)}
              />
            </div>
            <div className='edit-restaurant-button'>
              <Link
                to='/restaurants'
                className='link'
                onClick={(e) => onSubmitForm(e)}
              >
                Modifier le restaurant
              </Link>
              <Link to='/restaurants' className='link'>
                Retour a la liste
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}