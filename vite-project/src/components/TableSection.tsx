import React from "react";

import { 
    TableBody, 
    TableCell, 
    TableRow, 
    Table, 
    TableHeader, 
    TableHeaderCell, 
    makeStyles, 
    tokens, 
    shorthands 
} from "@fluentui/react-components";

import { calculateInvestmentResults , formatter } from "../util/Investment.ts";

type UserInput = {
    initialInvestment: number;
    annualInvestment: number;
    expectedReturn: number;
    duration: number;
}

type TableSectionProps = {
    input: UserInput;
}

const useStyles = makeStyles({
    root: {
        ...shorthands.margin("20px", "250px"),
        maxWidth: "50rem",
        boxShadow: tokens.shadow16

    },
    theader: {
        backgroundColor: tokens.colorPaletteLightGreenBackground2,

    },
    cell: {
        fontWeight: tokens.fontWeightSemibold,
        alignItems: "center",
        justifyContent: "center",
    },
})

const TableSection: React.FC<TableSectionProps> = ({ input }) => {

    const styles = useStyles();

    const result = calculateInvestmentResults(input);
    const initialInvestment = result[0].valueEndOfYear - result[0].interest - result[0].annualInvestment;
    return (
        <div>
            <Table className={styles.root} aria-label="Default table">
                <TableHeader className={styles.theader}>
                    <TableRow>
                        <TableHeaderCell className={styles.cell}>Year</TableHeaderCell>
                        <TableHeaderCell className={styles.cell}>Investment Value</TableHeaderCell>
                        <TableHeaderCell className={styles.cell}>Interest</TableHeaderCell>
                        <TableHeaderCell className={styles.cell}>Total Interest</TableHeaderCell>
                        <TableHeaderCell className={styles.cell}>Invested Capital</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {result.map((item) => {
                        const totalInterest = item.valueEndOfYear - item.annualInvestment * item.year - initialInvestment;
                        const investedCapital = item.valueEndOfYear - totalInterest;
                        return (
                            <TableRow key={item.year}>
                                <TableCell>{item.year}</TableCell>
                                <TableCell>{formatter.format(item.valueEndOfYear)}</TableCell>
                                <TableCell>{formatter.format(item.interest)}</TableCell>
                                <TableCell>{formatter.format(totalInterest)}</TableCell>
                                <TableCell>{formatter.format(investedCapital)}</TableCell>
                            </TableRow>)
                    })
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default TableSection;