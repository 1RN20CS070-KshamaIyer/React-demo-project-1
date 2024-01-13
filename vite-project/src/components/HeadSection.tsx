import React from "react";

import { 
    makeStyles, 
    shorthands, 
    Image 
} from "@fluentui/react-components"

import image from "../assets/DollarName.png"

const useStyles = makeStyles({
    headContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...shorthands.padding("5px", "0px"),
    },
    titleContainer: {
        color: "#035642"
    }

})


const HeaderSection: React.FC = () => {
    const styles = useStyles();

    return (
        <div id="head-container" className={styles.headContainer}>
            <div id="image-container">
                <Image
                    src={image}
                    alt="Dollar sign"
                    height={100}
                    width={100}
                />
            </div>
            <div id="title-container" >
                <h1 className={styles.titleContainer}>NVESTMENT CALCULATOR</h1>
            </div>
        </div>
    );
}

export default HeaderSection;