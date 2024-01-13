import React from "react";

import { 
  makeStyles, 
  shorthands, 
  tokens 
} from "@fluentui/react-components"

import HeaderSection from "./components/HeadSection"
import BodySection from "./components/BodySection"

const useStyles = makeStyles({
  main: {
    ...shorthands.margin("20px", "20px"),
    height: "auto",
    backgroundColor: tokens.colorPaletteLightGreenBackground1,
    boxShadow: tokens.shadow16,
  },
  headSection: {
    backgroundColor: tokens.colorPaletteLightGreenBackground2,
    boxShadow: tokens.shadow16,

  }
})

const App: React.FC = () => {
  const styles = useStyles();
  return (
    <div id="main" className={styles.main}>
      <div id="content-holder">
        <div id="head-section" className={styles.headSection}>
          <HeaderSection />
        </div>
        <div id="body-section">
          <BodySection />
        </div>
      </div>
    </div>

  )
}

export default App
