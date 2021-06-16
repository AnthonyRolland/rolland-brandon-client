import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { IoIosClose } from "react-icons/io";
import { FaPlusSquare } from "react-icons/fa";
import {style } from "../../style/main.scss";
import { withRouter } from 'react-router-dom';
//npm install graphql-tag
//npm install @apollo/react-hooks

const GET_PROJECTS = gql`
  {
    projects {
      _id
      name
      tasks{
        name
      }
    }
  }
`;


// Project QUERY
function Projects(arg) {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <ul>
      {data.projects.map(item =>
        <li key={item._id} value={item.name} className="project-list-item">
         
         <div className="project-item-detail">
            <h3>
              {item.name}
            </h3>
            <p>
              {item.tasks.length} tasks in this project.
            </p>
          </div>
          <div className="project-item-action">
            <IoIosClose onClick={() => callMutation() } fontSize="1.75em"/>
            <button className="btn-primary" onClick={() => changeRoute(arg.props,("/project/" + item._id.toString()) )}>View</button>
          </div>
        </li>
      )}
      <li className="project-list-item" onClick={() => handleCreateNewProject(arg.props)}>
          <div className="project-item-action" style={{
            padding: "1em"
          }}>
            <FaPlusSquare fontSize="1.5em"/>
          </div>
         <div className="project-item-detail">
            <h3>
              Create a new project
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

function handleCreateNewProject(props) {
  console.log(props)
  props.history.push('/new-project')
  alert("Development information: \n Call a mutation to create a new project");
}

function callMutation() {
  alert("Development information: \n Call a mutation to delete this project");
}

class ProjetList extends React.Component {
  render() {
    return (
      <div className="container">
        <h4>List of all projects.</h4>
        <Projects props={this.props}/>
      </div>
    );
  }
}

export default withRouter(ProjetList);
