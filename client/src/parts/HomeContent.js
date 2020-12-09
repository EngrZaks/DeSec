import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const HomeContentWrapper = styled.div`
  padding: 1.5rem;
  width: 350px;
  margin: auto;
  height: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  @media only screen and (max-width: 580px) {
    width: 85%;
  }

  h1 {
    letter-spacing: 0.1rem;
    font-size: 2.6rem;
    color: var(--main-color);
    text-align: center;
    margin-bottom: 3rem;
    font-family: var(--main-font);
  }
  a {
    text-decoration: none;
    margin-top: 2rem;

    display: block;
  }
`;

function HomeContent() {
  return (
    <HomeContentWrapper>
      <h1>Do you need Help?</h1>
      <Link to="/distress">
        <Button>Distress Signal</Button>
      </Link>
      <Link to="/message">
        <Button>SOS Message</Button>
      </Link>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Link to="/signup">
        <Button>Signup</Button>
      </Link>
    </HomeContentWrapper>
  );
}

export default HomeContent;
