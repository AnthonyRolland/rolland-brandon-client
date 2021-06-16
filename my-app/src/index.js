import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./style/index.css";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { InMemoryCache, gql } from 'apollo-boost';
//npm install apollo-boost @apollo/react-hooks graphql

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

/*

This assert permit to test the server

client.query({
    query: gql`
    query Assert{
      userSchemaAssert
    } 
    `
  })
  .then(result => console.log("Reponse from graphql:", result));*/

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={ client }>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// Ask for notification
Notification.requestPermission( function(status) {
  console.log(status); // les notifications ne seront affichées que si "autorisées"
  var n = new Notification("title", {body: "notification body"}); // this also shows the notification
});

serviceWorker.register();
