import React, { Component } from "react";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";


const ADD_PROJECT = gql`
  mutation CreateProject($name: String! ,$description: String!) {
    createProject(name: $name, description: $description)
  }
`;


function AddProject() {
    let name;
    let description;
    const [addProject, { data }] = useMutation(ADD_PROJECT);
  
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            addProject({ variables: { name: name.value, description: description.value } });
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

        <button type="submit" className="btn-primary">Create project</button>
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
        <h4>Create a new project</h4>
        <AddProject />
      </div>
    );
  }
}

export default withRouter(ProjetDetail);
