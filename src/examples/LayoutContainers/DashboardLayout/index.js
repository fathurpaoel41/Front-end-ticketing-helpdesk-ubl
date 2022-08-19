import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React context
import { useSoftUIController, setLayout } from "context";

import baseurl from "../../../API/baseurl"

import { useNavigate } from "react-router-dom";

function DashboardLayout({ children }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  let navigate = useNavigate();

  useEffect(() => {
    checkSession()
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  const checkSession = () => {
    let token = localStorage.getItem("token")
    if (token != null) {
      const baseUrl = new baseurl()
      baseUrl.checkSession().then((res) => {
        if (res.data.status === false || res.data.status === "Unauthorize") {
          localStorage.setItem("id_user", null)
          navigate("/authentication/sign-in", { replace: true });
        }
      })
    } else {
      localStorage.setItem("id_user", null)
      navigate("/authentication/sign-in", { replace: true });
    }
  }

  return (
    <SuiBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </SuiBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
