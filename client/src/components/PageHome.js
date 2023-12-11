/*
This is a public page that shows public content. 
People don’t need to log in to view this page.
*/

import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  const fetchData = async () => {
    try {
      const response = await UserService.getPublicContent();
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);

      const _content =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      setContent(_content);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Home;