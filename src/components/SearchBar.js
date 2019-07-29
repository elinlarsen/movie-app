import React from "react";
import styled from "styled-components";

const SearchStyle = styled.input`
  width: 100vw;
  color: black;
  border: 1pw solid black;
  padding: 3vh;
  font-size: 1.3rem;
  text-align: center;

  ::placeholder {
    color: lightgrey;
  }
`;

export default function SearchBar(props) {
  return (
    <SearchStyle
      type="text"
      onChange={e => props.handleChange(e.target.value)}
      placeholder={props.placeholder}
    />
  );
}
