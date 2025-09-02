import React, { useRef } from "react";
import { useTypedSelector } from "../../utils/useTypedSelector";
import { useActions } from "../../utils/useActions";
import { IState } from "../../types/state";
import { LinkWrap } from "../navbar/Navbar.style";
import { FindWrap, SidebarWrap, Text } from "./Sidebar.style";
import { Btn } from "../toolbar/Toolbar.style";
import { Input } from "../../pages/auth/AuthForm.style";

const Sidebar: React.FC = () => {
  const { users, find } = useTypedSelector((state: IState) => state.data);
  const { findReq, filtredUsers, setCanvasPage } = useActions();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchUserHandler = () => {
    filtredUsers(users, find);
    inputRef!.current!.value = "";
  };

  const setCanvasPageHandler = () => {
    setCanvasPage(true);
  };

  return (
    <SidebarWrap>
      <LinkWrap to="/canvas" onClick={setCanvasPageHandler}>
        Create new picture
      </LinkWrap>
      <FindWrap>
        <Text>Find user picture</Text>
        <Input
          placeholder="example@mail.com"
          ref={inputRef}
          type="text"
          onChange={(e) => findReq(e.target.value.toLowerCase())}
        />
        <Btn onClick={searchUserHandler}>Find</Btn>
      </FindWrap>
    </SidebarWrap>
  );
};

export default Sidebar;
