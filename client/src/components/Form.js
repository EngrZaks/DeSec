import styled from "styled-components";

const Form = styled.form`
  width: 350px;
  margin: auto;
  @media only screen and (max-width: 580px) {
    width: 85%;
  }
  div {
    margin-top: 1.5rem;
    width: 100%;

    input {
      width: 100%;
      padding: 0.8rem 0.8rem;
      border: none;
      border-radius: 5px;
    }
    label {
      font-size: 0.9rem;
      font-family: var(--main-font);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
  }

  button {
    margin-top: 2rem;
  }
`;

export default Form;
