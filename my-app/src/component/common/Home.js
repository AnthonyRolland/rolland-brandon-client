import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_GRAPHQL_INFO = gql`
  {
    userSchemaAssert
  }
`;

function CheckConfig() {
  const { loading, error, data, networkStatus } = useQuery(GET_GRAPHQL_INFO);

  if (loading) return <span className="status-warning">LOADING</span>;
  if (error) return <span className="status-error">ERROR</span>;
  return <span className="status-ok">OK</span>;
}

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <h4>HomePage</h4>
        <p>Now we have:</p>
        <ul>
          <li>A server with GraphQL enable</li>
          <li>A client that wait to get data</li>
        </ul>
        <p>Next step, will be to add graphql on the client side.</p>
        <p>
          GraphQL status: <CheckConfig />
        </p>
        <p>We gonna build some queries, that will be sent to the server</p>
        <p>Queries:</p>
        <ul>
          <li>
            <strong>GetUserInformation</strong>: get user datas by id
          </li>
          <li>
            <strong>GetProjectsList</strong>: get all the projects (by user)
          </li>
          <li>
            <strong>GetProject</strong>: get a project by id
          </li>
          <li>
            <strong>GetTasksList</strong>: get all the tasks by project
          </li>
          <li>
            <strong>GetTask</strong>: get a task by id
          </li>
        </ul>

        <p>Database: Mongo db</p>
        <p>API: <button><a href="http://localhost:4000/" style={{color:"lightseagreen"}}>graphql</a></button></p>
        <p>Icon: react-icon</p>
      </div>
    );
  }
}

export default HomePage;
