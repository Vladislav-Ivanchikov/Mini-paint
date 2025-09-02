import React, { useEffect } from "react";
import { useActions } from "../../utils/useActions";
import { useTypedSelector } from "../../utils/useTypedSelector";
import { brushAction } from "../../store/action-creators/toolAction";
import { UsersDataType } from "../../types/data";
import { IState } from "../../types/state";
import {
  GalleryWrapper,
  NotFoundWrap,
  PicText,
  PicWrapper,
} from "./Gallery.style";
import { BackLinkWrap, BackLinkWrapNotFound } from "../navbar/Navbar.style";

export interface IProps {
  fetch: () => Promise<void>;
}

const Gallery: React.FC<IProps> = ({ fetch }) => {
  const { users } = useTypedSelector((state: IState) => state.data);
  const { setStrokeColor, setFillColor, setLineWidth } = useActions();

  const reloadHandler = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetch();
    setStrokeColor("black");
    setFillColor("white");
    setLineWidth(1);
    brushAction();
    // eslint-disable-next-line
  }, []);

  return (
    <GalleryWrapper>
      {users.length > 0 ? (
        <>
          {users.map((user: UsersDataType) => (
            <PicWrapper key={user.image}>
              <img
                style={{ background: "white" }}
                src={user.image}
                width={250}
                height={200}
                alt=""
              />
              <PicText>{user.username}</PicText>
            </PicWrapper>
          ))}
          <BackLinkWrap to="/" onClick={reloadHandler}>
            {"< Gallery"}
          </BackLinkWrap>
        </>
      ) : (
        <NotFoundWrap>
          <h2>Pictures not found...</h2>
          <BackLinkWrapNotFound to="/" onClick={reloadHandler}>
            {"< Gallery"}
          </BackLinkWrapNotFound>
        </NotFoundWrap>
      )}
    </GalleryWrapper>
  );
};

export default Gallery;
