import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../../context/AuthContext";
import { RouteName } from "../../types/routes";
import { Context } from "../../index";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { IState } from "../../types/state";
import { useTypedSelector } from "../../utils/useTypedSelector";
import { useActions } from "../../utils/useActions";
import { LinkWrap, NavbarWrap } from "./Navbar.style";

const Navbar: React.FC = () => {
  const { auth } = useContext(Context);
  let [user] = useAuthState(auth);
  const { logOut } = useAuth();
  const { canvasPage } = useTypedSelector((state: IState) => state.canvas);
  const { setCanvasPage } = useActions();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    window.location.reload();
    setCanvasPage(!canvasPage);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      await Swal.fire({
        position: "center",
        icon: "success",
        title: `You are sign out Mini paint, come again !`,
        showConfirmButton: false,
        timer: 3000,
      });
    } catch {
      await Swal.fire({
        position: "top",
        icon: "error",
        title: `Something went wrong, please try letter`,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <NavbarWrap>
      <LinkWrap to="/" onClick={handleClick}>
        Mini Paint
      </LinkWrap>
      {user ? (
        <LinkWrap to="/" onClick={handleLogOut}>
          Sign out
        </LinkWrap>
      ) : (
        <div>
          <LinkWrap to={RouteName.SIGNIN_ROUTE}>Sign in</LinkWrap>|
          <LinkWrap to={RouteName.REG_ROUTE}>Register</LinkWrap>
        </div>
      )}
    </NavbarWrap>
  );
};

export default Navbar;
