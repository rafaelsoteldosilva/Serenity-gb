import * as React from "react"
import ShowNavigationStripe from "./ShowNavigationStripe"
import ShowBottomStripe from "./ShowBottomStripe"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <ShowNavigationStripe />
      {children}
      <ShowBottomStripe />
    </React.Fragment>
  )
}

export default Layout
