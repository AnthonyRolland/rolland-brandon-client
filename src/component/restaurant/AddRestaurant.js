import React, { Fragment, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from 'react-router';
import gql from "graphql-tag";
import '../../style/AddRestaurant.scss';
import { Link } from 'react-router-dom';
import { GET_RESTAURANTS } from "./Restaurant";

const ADD_RESTAURANT = gql`
  mutation CreateRestaurant($name: String! ,$slogan: String!) {
    createRestaurant(name: $name, slogan: $slogan)

  }
`;

export default function AddRestaurant(props) {
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const [addRestaurant] = useMutation(ADD_RESTAURANT);

  const getData = (key) => (formData.hasOwnProperty(key) ? formData[key] : '');

  const setData = (key, value) => setFormData({ ...formData, [key]: value });

  const onSubmitForm = (event) => {
    event.preventDefault();
    addRestaurant({
      variables: { name: getData('name'), slogan: getData('slogan') },
      refetchQueries: [{ query: GET_RESTAURANTS }],
    }).then((unusedResponse) => history.push('/restaurants'));
  };

  return (
    <Fragment>
      <div className='AddRestaurant'>
        <h2>Ajouter un nouveau restaurant:</h2>
        <div>
          <form onSubmit={onSubmitForm}>
            <div className='name-input'>
              <label>Nom :</label>
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
              <label>Slogan :</label>
              <input
                name='slogan'
                type='text'
                required
                placeholder='slogan'
                value={getData('slogan')}
                onChange={(e) => setData('slogan', e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className='add-restaurant-button'>
          <Link to='/restaurants' className='link' onClick={(e) => onSubmitForm(e)}>
            Ajouter un Restaurant
          </Link>
          <Link to='/restaurants' className='link'>
            Retourner à la liste
          </Link>
        </div>
      </div>
    </Fragment>
  );
}