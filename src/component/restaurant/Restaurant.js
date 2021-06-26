import React from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { IoIosClose } from "react-icons/io";
import { FaPlusSquare } from "react-icons/fa";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


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

// Restaurant QUERY
function Restaurant(arg) {
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  const [deleteRestaurant] = useMutation(DELETE_RESTAURANT);

  const onDeleteRestaurant = (event, id) => {
    event.preventDefault();
    deleteRestaurant({
      variables: { id },
    });
    data.restaurants = data.restaurants.filter((restaurant) => restaurant._id !== id);
  };
  
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <ul>
      {data.restaurants.map(item =>
        <li key={item._id} value={item.name} className="restaurant-list-item">
         
         <div className="restaurant-item-detail">
            <h3>
              {item.name}
            </h3>
            <p>
              {item.meals.length} meals disponible dans ce restaurant.
            </p>
          </div>
          <div className="restaurant-item-action">
            <IoIosClose onClick={(e) => onDeleteRestaurant(e, item._id)} fontSize="1.75em"/>
            <button className="btn-primary" onClick={() => changeRoute(arg.props,("/restaurant/" + item._id.toString()) )}>Voir détail</button>
            <button className="btn-primary" onClick={() => changeRoute(arg.props,("/restaurant/edit/" + item._id.toString()) )}>Modifier</button>
          </div>
        </li>
      )}
      <li className="restaurant-list-item" onClick={() => handleCreateNewRestaurant(arg.props)}>
          <div className="restaurant-item-action" style={{
            padding: "1em"
          }}>
            <FaPlusSquare fontSize="1.5em"/>
          </div>
         <div className="restaurant-item-detail">
            <h3>
              Créer un nouveau restaurant
            </h3>
          </div>
        </li>
    </ul>
  );
}


function changeRoute(props, route) {
  props.history.push(route)
}

function handleCreateNewRestaurant(props) {
  props.history.push('/restaurant/add')
}

class ProjetList extends React.Component {
  render() {
    return (
      <div className="container">
        <h4>Liste de tous les Restaurants</h4>
        <Restaurant props={this.props}/>
      </div>
    );
  }
}

export default withRouter(ProjetList);
