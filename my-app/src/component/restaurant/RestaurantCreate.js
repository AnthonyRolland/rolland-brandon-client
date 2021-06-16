import React, { Component } from "react";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";


const ADD_PROJECT = gql`
  mutation CreateRestaurant($name: String! ,$description: String!) {
    createRestaurant(name: $name, description: $description)
  }
`;


function AddRestaurant() {
    let name;
    let description;
    const [addRestaurant, { data }] = useMutation(ADD_PROJECT);
  
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            addRestaurant({ variables: { name: name.value, description: description.value } });
            name.value = '';
            description.value = '';
          }}
        >
        <p>Title:</p>
        <input
          ref={node => {
            name = node;
          }}
        />
        <p>Description:</p>
        <input
          ref={node => {
            description = node;
          }}
        />
        <div className="margin-v-m">

        <button type="submit" className="btn-primary">Create restaurant</button>
        </div>
        </form>
      </div>
    );
  }

class ProjetDetail extends Component {
  render() {
    console.log(this);
    return (
      <div className="container">
        <h4>Create a new restaurant</h4>
        <AddRestaurant />
      </div>
    );
  }
}

export default withRouter(ProjetDetail);
