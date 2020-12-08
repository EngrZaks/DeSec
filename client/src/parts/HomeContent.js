import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  button {
    display: block;
    width: 100%;
    padding: 0.9rem 1.4rem;
    background: var(--main-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.6s;
    color: var(--white);
    font-family: var(--main-font);

    &:hover,
    &:focus {
      transform: translateY(-4px);
      transition: all 0.6s;
      outline: none;
    }
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
        <button>Distress Signal</button>
      </Link>
      <Link to="/message">
        <button>SOS Message</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </HomeContentWrapper>
  );
}

export default HomeContent;
