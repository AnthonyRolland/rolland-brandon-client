import { useMutation } from '@apollo/react-hooks';
import { Fragment, useState } from 'react';
import gpl from 'graphql-tag';
import { useHistory } from 'react-router';
import { GET_USERS } from './User';
import { Link } from 'react-router-dom';
import '../../style/AddUser.scss';
import React, { Component }  from 'react';

const ADD_USER = gpl`
    mutation createUserWithInput($userInput: UserInput!) {
        createUserWithInput(input: $userInput)
      }
`;

export default function AddUser(props) {
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const [addUser] = useMutation(ADD_USER);

  const getData = (key) => (formData.hasOwnProperty(key) ? formData[key] : '');

  const setData = (key, value) => setFormData({ ...formData, [key]: value });

  const onSubmitForm = (event) => {
    event.preventDefault();
    addUser({
      variables: {
        userInput: {
          name: getData('name'),
          surname: getData('surname'),
          login: getData('login'),
          pass: getData('pass'),
        },
      },
      refetchQueries: [{ query: GET_USERS }],
    }).then((unusedResponse) => history.push('/user'));
  };

  return (
    <Fragment>
      <div className='AddUser'>
        <h2>Créer un nouveau user:</h2>
        <div>
          <form onSubmit={onSubmitForm}>
            <div className='name-input'>
              <label>Name:</label>
              <input
                name='name'
                type='text'
                required
                placeholder='Title'
                value={getData('name')}
                onChange={(e) => setData('name', e.target.value)}
              />
            </div>
            <div className='surname-input'>
              <label>Surname:</label>
              <input
                name='surname'
                type='text'
                required
                placeholder='Surname'
                value={getData('surname')}
                onChange={(e) => setData('surname', e.target.value)}
              />
            </div>
            <div className='login-input'>
              <label>Login:</label>
              <input
                name='login'
                type='text'
                required
                placeholder='Login '
                value={getData('login')}
                onChange={(e) => setData('login', e.target.value)}
              />
            </div>
            <div className='password-input'>
              <label>Password:</label>
              <input
                name='password'
                type='password'
                required
                placeholder='Surname'
                value={getData('pass')}
                onChange={(e) => setData('pass', e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className='add-user-button'>
          <Link to='/user' className='link' onClick={(e) => onSubmitForm(e)}>
            Valider
          </Link>
          <Link to='/user' className='link'>
            Retourner a la liste des Users
          </Link>
        </div>
      </div>
    </Fragment>
  );
}