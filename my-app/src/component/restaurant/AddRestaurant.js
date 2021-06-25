import React, { Component } from "react";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";


const ADD_RESTAURANT = gql`
  mutation CreateRestaurant($name: String! ,$slogan: String!) {
    createRestaurant(name: $name, slogan: $slogan)

  }
`;


function AddRestaurant() {
    let name;
    let slogan;
    const [addRestaurant, { data }] = useMutation(ADD_RESTAURANT);
  
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            addRestaurant({ variables: { name: name.value, slogan: slogan.value } });
            this.props.history.push('/restaurants');
          }}
        >
        <p>Nom:</p>
        <input
          ref={node => {
            name = node;
          }}
        />
        <p>Slogan:</p>
        <input
          ref={node => {
            slogan = node;
          }}
        />  
        <div className="margin-v-m">
             <button type="submit" className="btn-primary"> Valider</button>
        </div>
        </form>
      </div>
    );
  }

class ProjetDetail extends Component {
  render() {
    return (
      <div className="container">
        <h4>Créer un nouveau restaurant :</h4>
        <AddRestaurant props={this.props}/>
      </div>
    );
  }
}

export default withRouter(ProjetDetail);
