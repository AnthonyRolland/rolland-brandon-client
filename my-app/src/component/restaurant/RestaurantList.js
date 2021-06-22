import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { IoIosClose } from "react-icons/io";
import { FaPlusSquare } from "react-icons/fa";
import {style } from "../../style/main.scss";
import { withRouter } from 'react-router-dom';

const GET_RESTAURANTS = gql`
  {
    restaurants {
      _id
      name
      slogan
      meals {
        _id
        name
        description
        type
        price
      }
    }
  }
`;


// Restaurant QUERY
function Restaurant(arg) {
  const { loading, error, data } = useQuery(GET_RESTAURANTS);

  
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
              {item.meals.length} meals in this restaurant.
            </p>
          </div>
          <div className="restaurant-item-action">
            <IoIosClose onClick={() => callMutation() } fontSize="1.75em"/>
            <button className="btn-primary" onClick={() => changeRoute(arg.props,("/restaurant/" + item._id.toString()) )}>View</button>
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
              Create a new restaurant
            </h3>
          </div>
        </li>
    </ul>
  );
}


function changeRoute(props, route) {
  console.log(props, route);
  props.history.push(route)
}

function handleCreateNewRestaurant(props) {
  console.log(props)
  props.history.push('/new-restaurant')
  alert("Development information: \n Call a mutation to create a new restaurant");
}

function callMutation() {
  alert("Development information: \n Call a mutation to delete this restaurant");
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
