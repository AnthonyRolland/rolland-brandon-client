import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { IoIosClose, IoMdCheckmark } from "react-icons/io";
import { FaPlusSquare } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

const GET_PROJECT = gql`
  query Restaurants($id: ID!) {
    restaurant(_id: $id) {
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

function Restaurant({ arg, id }) {
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id }
  });

  console.log(arg, id)

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const restaurant = data.restaurant;
  console.log("Data received from Restaurant: ", restaurant);
  return (
    <div>
      <h2>
        {restaurant.name}
      </h2>
      <p>
        {restaurant.slogan}
      </p>
      <ul>
        {restaurant.meals.map(item =>
          <li key={item._id} value={item.name} className="restaurant-list-item" onClick={() => changeRoute(arg, ("/meal/" + item._id.toString()))}>
            <div className="restaurant-item-detail">
              <h3>
                {item.name}
              </h3>
              <p>
                {item.slogan}
              </p>
            </div>
            <div className="restaurant-item-action">
              <IoIosClose
                fontSize="1.75em"
                color="tomato"
                onClick={callMutationToCancelMeal}
              />
              <IoMdCheckmark
                fontSize="1.75em"
                color="lightseagreen"
                onClick={callMutationToValidateMeal}
              />
            </div>
          </li>
        )}
        <li className="restaurant-list-item" onClick={callMutation}>
          <div
            className="restaurant-item-action"
            style={{
              padding: "1em"
            }}
          >
            <FaPlusSquare fontSize="1.5em" />
          </div>
          <div className="restaurant-item-detail">
            <h3>Add new meal</h3>
          </div>
        </li>
      </ul>

      {restaurant.meals.length === 0 &&
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <img
            width="10%"
            alt="Not found"
            src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/no_data_qbuo.svg"
          />
          <h4>This restaurant did not contain any meal.</h4>
        </div>}
    </div>
  );
}

function callMutationToValidateMeal() {
  alert("Development information: \n Call a mutation to validate this meal");
}
function callMutationToCancelMeal() {
  alert("Development information: \n Call a mutation to cancel this meal");
}
function callMutation() {
  alert("Development information: \n Call a mutation to add a new meal");
}

function changeRoute(props, route) {
  console.log(props, route);
  props.history.push(route);
}

class ProjetDetail extends Component {
  render() {
    console.log(this);
    return (
      <div className="container">
        <Restaurant arg={this.props} id={this.props.match.params.id} />
      </div>
    );
  }
}

export default withRouter(ProjetDetail);
