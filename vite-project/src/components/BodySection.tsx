import React,{ useState } from "react";

import { 
    makeStyles, 
    shorthands
} from "@fluentui/react-components"

import InputSection from "./InputSection";
import TableSection from "./TableSection";


type UserInput = {
    initialInvestment: any;
    annualInvestment: any;
    expectedReturn: any;
    duration: any;
}

const useStyles = makeStyles({
    table: {
        height: "100%",
        ...shorthands.padding("0px", "0px", "10px", "0px")
    }
})

const BodySection: React.FC = () => {
    const styles = useStyles();

    const [userInput, setUserInput] = useState<UserInput>({ 
        initialInvestment: null, 
        annualInvestment: null, 
        expectedReturn: null, 
        duration: null 
    });

    function handleDataSubmit(data: UserInput) {
        const convertedData: UserInput = {
            initialInvestment: parseInt(data.initialInvestment, 10),
            annualInvestment: parseInt(data.annualInvestment, 10),
            expectedReturn: parseInt(data.expectedReturn, 10),
            duration: parseInt(data.duration, 10)
        };

        setUserInput(convertedData);
    }
    const validity = (userInput.initialInvestment >= 0 && userInput.annualInvestment >= 0 && userInput.expectedReturn >= 0 && userInput.duration > 0)
    return (
        <div id="body-container">
            <div id="input-container">
                <InputSection handleDataSubmit={handleDataSubmit} userInput={userInput} />
            </div>
            <div id="table-container" className={styles.table}>
                {validity && <TableSection input={userInput} />}
                {!validity && <></>}
            </div>
        </div>
    );
}

export default BodySection;