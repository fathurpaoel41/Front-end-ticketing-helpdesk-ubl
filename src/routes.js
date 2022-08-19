/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import DashboardITOperator from "layouts/dashboard-it-operator"
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import BlankScreen from "layouts/blank-screen";
import Ticket from "layouts/ticket";
import InputTicket from "layouts/input-ticket";
import DetailTicket from "layouts/detail-ticket";
import UserList from "layouts/user-list";
import InputUser from "layouts/input-user";
import ViewUser from "layouts/view-user";
import Divisi from "layouts/divisi";

//icons
import DivisionIcon from "examples/Icons/DivisionIcon";
import UserListIcon from "examples/Icons/UserListIcon";
import Cube from "examples/Icons/Cube";
import CreditCard from "examples/Icons/CreditCard";
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import InputDivisi from "layouts/divisi/input-divisi";
import ViewDivisi from "layouts/divisi/view-divisi";
import CategoryIcon from "examples/Icons/CategoryIcon";
import Category from "layouts/category";
import ViewCategory from "layouts/category/view-category"
import InputCategory from "layouts/category/input-category";
import { useEffect } from "react"

// import AuthApi from "./API/AuthApi"
// const checkRole = new Promise((resolve, reject) => {
//   const authApi = new AuthApi()
//   authApi.me().then(res => {
//     if (res.status) {
//       resolve(res.data)
//     } else {
//       window.location.href = '/authentication/sign-in'
//     }
//   }).catch(error => {
//     console.log(error)
//   })
// });

// checkRole.then(res => {
//   console.log({ res: res.data.divisi })
// })

const routesAll = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Ticket",
    key: "ticket",
    route: "/ticket",
    icon: <CustomerSupport size="12px" />,
    component: <Ticket />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "User List",
    key: "user-list",
    route: "/user-list",
    icon: <UserListIcon size="12px" />,
    component: <UserList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Divisi",
    key: "divisi",
    route: "/divisi",
    icon: <DivisionIcon size="12px" />,
    component: <Divisi />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Kategori",
    key: "kategori",
    route: "/kategori",
    icon: <CategoryIcon size="12px" />,
    component: <Category />,
    noCollapse: true,
  },
  // { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    route: "/authentication/sign-in",
    component: <SignIn />,
    noCollapse: true,
  },
  {
    name: "Input Ticket",
    route: "/ticket/input-ticket",
    component: <InputTicket />,
    noCollapse: true,
  },
  {
    name: "Detail Ticket",
    route: "/ticket/:idTicket",
    component: <DetailTicket />,
    noCollapse: true,
  },
  {
    name: "Input User",
    route: "/user-list/input-user",
    component: <InputUser />,
    noCollapse: true,
  },
  {
    name: "View User",
    route: "/user-list/:idUser",
    component: <ViewUser />,
    noCollapse: true,
  },
  {
    name: "Input Divisi",
    route: "/divisi/input-divisi",
    component: <InputDivisi />,
    noCollapse: true,
  },
  {
    name: "View Divisi",
    route: "/divisi/:idDivisi",
    component: <ViewDivisi />,
    noCollapse: true,
  },
  {
    name: "View Kategori",
    route: "/kategori/:idKategori",
    component: <ViewCategory />,
    noCollapse: true,
  },
  {
    name: "Input Kategori",
    route: "/kategori/input-kategori",
    component: <InputCategory />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignUp />,
  //   noCollapse: true,
  // },
];

const routesAdministrator = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <DashboardITOperator />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Ticket",
    key: "ticket",
    route: "/ticket",
    icon: <CustomerSupport size="12px" />,
    component: <Ticket />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "User List",
    key: "user-list",
    route: "/user-list",
    icon: <UserListIcon size="12px" />,
    component: <UserList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Divisi",
    key: "divisi",
    route: "/divisi",
    icon: <DivisionIcon size="12px" />,
    component: <Divisi />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    route: "/authentication/sign-in",
    component: <SignIn />,
    noCollapse: true,
  },
  {
    name: "Input Ticket",
    route: "/ticket/input-ticket",
    component: <InputTicket />,
    noCollapse: true,
  },
  {
    name: "Detail Ticket",
    route: "/ticket/:idTicket",
    component: <DetailTicket />,
    noCollapse: true,
  },
  {
    name: "Input User",
    route: "/user-list/input-user",
    component: <InputUser />,
    noCollapse: true,
  },
  {
    name: "View User",
    route: "/user-list/:idUser",
    component: <ViewUser />,
    noCollapse: true,
  },
  {
    name: "Input Divisi",
    route: "/divisi/input-divisi",
    component: <InputDivisi />,
    noCollapse: true,
  },
  {
    name: "View Divisi",
    route: "/divisi/:idDivisi",
    component: <ViewDivisi />,
    noCollapse: true,
  },
]

const routesITOperator = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <DashboardITOperator />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Ticket",
    key: "ticket",
    route: "/ticket",
    icon: <CustomerSupport size="12px" />,
    component: <Ticket />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Kategori",
    key: "kategori",
    route: "/kategori",
    icon: <CategoryIcon size="12px" />,
    component: <Category />,
    noCollapse: true,
  },
  {
    route: "/authentication/sign-in",
    component: <SignIn />,
    noCollapse: true,
  },
  {
    name: "View Kategori",
    route: "/kategori/:idKategori",
    component: <ViewCategory />,
    noCollapse: true,
  },
  {
    name: "Input Kategori",
    route: "/kategori/input-kategori",
    component: <InputCategory />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    name: "Detail Ticket",
    route: "/ticket/:idTicket",
    component: <DetailTicket />,
    noCollapse: true,
  },
  {
    name: "Input Ticket",
    route: "/ticket/input-ticket",
    component: <InputTicket />,
    noCollapse: true,
  },
]


const routesClient = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <DashboardITOperator />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Ticket",
    key: "ticket",
    route: "/ticket",
    icon: <CustomerSupport size="12px" />,
    component: <Ticket />,
    noCollapse: true,
  },
  {
    route: "/authentication/sign-in",
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    name: "Detail Ticket",
    route: "/ticket/:idTicket",
    component: <DetailTicket />,
    noCollapse: true,
  },
  {
    name: "Input Ticket",
    route: "/ticket/input-ticket",
    component: <InputTicket />,
    noCollapse: true,
  },
]

const routesITSupport = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <DashboardITOperator />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Ticket",
    key: "ticket",
    route: "/ticket",
    icon: <CustomerSupport size="12px" />,
    component: <Ticket />,
    noCollapse: true,
  },
  {
    route: "/authentication/sign-in",
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    name: "Detail Ticket",
    route: "/ticket/:idTicket",
    component: <DetailTicket />,
    noCollapse: true,
  },
  {
    name: "Input Ticket",
    route: "/ticket/input-ticket",
    component: <InputTicket />,
    noCollapse: true,
  },
]


// let route = null;
// let role = localStorage.getItem("role");
// console.log("check routes")
// if (role == "Administrator") {
//   route = routesAdministrator
// } else if (role == "IT Support") {
//   route = routesITSupport
// } else if (role == "IT Operator") {
//   route = routesITOperator
// } else {
//   route = routesClient
// }

const route = {
  Administrator: routesAdministrator,
  ITSupport: routesITSupport,
  ITOperator: routesITOperator,
  client: routesClient
}

export default route;
