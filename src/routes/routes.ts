import RoutesView from "../views/Routes/RoutesView";
import MainView from "../views/Main/MainView";
import { Navigate } from "react-router-dom";
import React from "react";

const HomeRedirect = () =>
  React.createElement(Navigate, {
    to: "/routes",
    replace: true,
  });

export const routes = [
    {
        path: "/",
        name: "Home",
        element: HomeRedirect
    },
    {
        path: "/routes",
        name: "RoutesView",
        element: RoutesView,
    },
    {
        path: "/main",
        name: "MainView",
        element: MainView
    }
];