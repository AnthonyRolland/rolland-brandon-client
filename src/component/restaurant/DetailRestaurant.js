import React, { Fragment, useState } from "react";
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import '../../style/DetailRestaurant.scss';

export default function DetailRestaurant(props) {
  let {
    state: { restaurant },
  } = useLocation();
  const restaurantDetail = restaurant;

  return (
    <Fragment>
      <div class='DetailRestaurant'>
        <h2>Détails du restaurant :</h2>
        <div class='details-container'>
          <div>
            <strong>Nom:</strong> {restaurant.name}
          </div>
          <div>
            <strong>Slogan:</strong> {restaurant.slogan}
          </div>
        </div>
        <div className='link-back-container'>
          <Link to='/restaurants' className='link'>
            Retourner à la liste
          </Link>
        </div>
      </div>
    </Fragment>
  );
}