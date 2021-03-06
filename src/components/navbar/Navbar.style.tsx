import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavbarWrap = styled.header`
  display: flex;
  height: 10vh;
  align-items: center;
  justify-content: space-evenly;
  background-color: gray;
`;

export const LinkWrap = styled(Link)`
  font-size: 18px;
  color: aliceblue;
  background-color: transparent;
  text-decoration: none;
  margin: 0 10px;
  transition: 0.2s;

  :hover {
    text-shadow: 4px 3px 2px rgba(150, 150, 150, 1);
    color: white;
  }
`;