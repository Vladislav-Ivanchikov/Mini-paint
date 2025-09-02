import styled from "styled-components";
import { Text } from "../sidebar/Sidebar.style";

export const GalleryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  max-height: 90vh;
  overflow-y: auto;
  margin: 20px;
`;
export const PicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 250px;
  margin: 20px;

  &:hover {
    box-shadow: 4px 4px 8px 0px rgba(33, 33, 35, 0.2);
  }
`;

export const NotFoundWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  @media ${({ theme }) => theme.media.medium} {
    margin-top: 30%;
    position: static;
  }
`;

export const PicText = styled(Text)`
  color: #565656;
`;
