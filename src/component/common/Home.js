import { useQuery } from '@apollo/react-hooks';
import React, { Component } from "react";
import gpl from 'graphql-tag';
import { Fragment } from 'react';
import '../../style/Home.scss';

const GET_GRAPHQL_INFO = gpl`
    {
        userSchemaAssert
    }
`;

function CheckConfig() {
  const { loading, error } = useQuery(GET_GRAPHQL_INFO);

  if (loading) return <span className='status-warning'>LOADING</span>;
  if (error)
    return (
      <span className='status-error'>
        <strong>ERREUR</strong>
      </span>
    );
  return (
    <span className='status-ok'>
      <strong>OK</strong>
    </span>
  );
}

export default function Home(props) {
  return (
    <Fragment>
      <div className='Home'>
        <h2>Ceci est la page Home</h2>
        <p>
          GraphQL status: <CheckConfig />
        </p>
        <p>Database: Mongo db</p>
        <p>API pour accés a GraphQL: <button><a href="http://localhost:4000/" style={{color:"lightseagreen"}}>graphql</a></button></p>
    
      </div>
    </Fragment>
  );
}