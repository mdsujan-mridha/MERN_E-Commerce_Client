import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material';
import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react';
import { Fragment } from 'react';
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography> Shipping Details </Typography>,
            icon: <LocalShipping />,
        },
        {
            label: <Typography> Confirm </Typography>,
            icon: <LibraryAddCheck />,
        },
        {
            label: <Typography>  Payment </Typography>,
            icon: <AccountBalance />
        },

    ]
    const stepStyles = {
        boxSizing: "border-box",
    }
    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {
                    steps?.map((item, index) => (
                        <Step
                            key={index}
                            active={activeStep === index ? true : false}
                            completed={activeStep >= index ? true : false}
                        >
                            <StepLabel
                                style={{
                                    color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649",
                                }}
                                icon={item.icon}
                            ></StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
        </Fragment>
    );
};

export default CheckoutSteps;