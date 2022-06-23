import React from "react";
import PropTypes from "prop-types";
import Layout from "./src/components/Layout";
import { GlobalStyles, globalTheme } from "./src/globals/globalStyles";
import { ThemeProvider } from "styled-components";
import GlobalContextProvider from "./src/globals/globalContextProvider";

// exports.onRouteUpdate = ({ location, prevLocation }) => {
//   console.log("new pathname", location.pathname)
//   console.log("old pathname", prevLocation ? prevLocation.pathname : null)
// }

export const wrapRootElement = ({ element }) => {
    return (
        <ThemeProvider theme={globalTheme}>
            <GlobalStyles />
            <GlobalContextProvider>
                <Layout>{element}</Layout>
            </GlobalContextProvider>
        </ThemeProvider>
    );
};

wrapRootElement.propTypes = {
    element: PropTypes.node,
};
