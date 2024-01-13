import React, { useState } from "react";

import { useForm, FieldValues } from "react-hook-form";
import {
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  Button,
  makeStyles,
  shorthands,
  tokens,
  Input,
  Field,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";


type UserInput = {
  initialInvestment: number;
  annualInvestment: number;
  expectedReturn: number;
  duration: number;
}

type InputSectionProps = {
  handleDataSubmit: (data: UserInput) => void;
  userInput: UserInput;
}

const useStyles = makeStyles({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...shorthands.margin("20px", "0px"),
  },
  button: {
    backgroundColor: tokens.colorPaletteLightGreenBackground2,
    boxShadow: tokens.shadow16,
  },
  drawer: {
    width: "30%",
    backgroundColor: tokens.colorPaletteLightGreenBackground2,
  },
  drawBody: {
    backgroundColor: tokens.colorPaletteLightGreenBackground1
  },
  formBlock: {
    display: "inline-flex",
    flexDirection: "column",
  },
  form: {
    ...shorthands.margin("30px", "20px"),
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("8px")

  },
  error: {
    color: "red",
    fontSize: "12px",
    alignItems: "start",
  }

})
  ;

const InputSection: React.FC<InputSectionProps> = ({
  handleDataSubmit,
  userInput,
}) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const { errors } = formState;

  const onSubmit = (data: FieldValues) => {
    const convertedData: UserInput = {
      initialInvestment: parseInt(data.initialInvestment as any, 10),
      annualInvestment: parseInt(data.annualInvestment as any, 10),
      expectedReturn: parseInt(data.expectedReturn as any, 10),
      duration: parseInt(data.duration as any, 10)
    };
    handleDataSubmit(convertedData);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div id="button-container" className={styles.buttonContainer}>
        <Button
          className={styles.button}
          size="medium"
          shape="rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          Click Here
        </Button>
      </div>
      <div id="drawer-container">
        <Drawer
          className={styles.drawer}
          type="overlay"
          separator
          position="end"
          open={isOpen}
          onOpenChange={(_, { open }) => setIsOpen(open)}
        >
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="Close"
                  icon={<Dismiss24Regular />}
                  onClick={() => setIsOpen(false)}
                />
              }
            >
              Input Values
            </DrawerHeaderTitle>
          </DrawerHeader>

          <DrawerBody className={styles.drawBody}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.formBlock}>
                <Field
                  label="Initial Investment"
                  validationState={errors.initialInvestment && "error"}
                  validationMessage={errors.initialInvestment?.message as string}
                  required
                >
                  <Input
                    id="initialInvestment"
                    defaultValue={userInput.initialInvestment?.toString()}
                    {...register("initialInvestment", {
                      required: { value: true, message: "Please enter a valid value" },
                      min: { value: 1, message: "Please enter a positive value" },
                      pattern: { value: /^[0-9]*$/, message: "Please enter numbers only" },
                    })}
                  />
                </Field>
              </div>
              <div className={styles.formBlock}>
                <Field
                  label="Annual Investment"
                  validationState={errors.annualInvestment && "error"}
                  validationMessage={errors.annualInvestment?.message as string}
                  required
                >
                  <Input
                    id="annualInvestment"
                    defaultValue={userInput.annualInvestment?.toString()}
                    {...register("annualInvestment", {
                      required: { value: true, message: "Please enter a valid value" },
                      min: { value: 1, message: "Please enter a positive value" },
                      pattern: { value: /^[0-9]*$/, message: "Please enter numbers only" },
                    })}
                  />
                </Field>
              </div>
              <div className={styles.formBlock}>
                <Field
                  label="Expected Return"
                  validationState={errors.expectedReturn && "error"}
                  validationMessage={errors.expectedReturn?.message as string}
                  required
                >
                  <Input
                    id="expectedReturn"
                    defaultValue={userInput.expectedReturn?.toString()}
                    {...register("expectedReturn", {
                      required: { value: true, message: "Please enter a valid value" },
                      min: { value: 1, message: "Please enter a positive value" },
                      pattern: { value: /^[0-9]*$/, message: "Please enter numbers only" },
                    })}
                  />
                </Field>
              </div>
              <div className={styles.formBlock}>
                <Field
                  label="Duration"
                  validationState={errors.duration && "error"}
                  validationMessage={errors.duration?.message as string}
                  required
                >
                  <Input
                    id="duration"
                    defaultValue={userInput.duration?.toString()}
                    {...register("duration", {
                      required: { value: true, message: "Please enter a valid value" },
                      min: { value: 1, message: "Please enter a positive value" },
                      pattern: { value: /^[0-9]*$/, message: "Please enter numbers only" },
                    })}
                  />
                </Field>
              </div>
              <br />
              <Button
                className={styles.button}
                type="submit"
                disabled={Object.keys(errors).length !== 0}
              >
                Submit
              </Button>
            </form>
          </DrawerBody>
        </Drawer>
      </div>
    </>
  );
};

export default InputSection;