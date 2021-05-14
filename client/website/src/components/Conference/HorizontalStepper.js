import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import StepConnector from "@material-ui/core/StepConnector";
import Step from "@material-ui/core/Step";
import { StepButton } from "@material-ui/core";
import CustomPagination from "./Pagination";
import useWindowSize from "../../util/ScreenListener";
import "../../css/Stepper/Stepper.css";

/**
 * Convert a given number into an ordinal number
 * @param {number} i
 * @returns string of ordinal number
 */
const ordinal_suffix_of = (i) => {
    const ones = i % 10;
    const hundreds = i % 100;

    // if the remainder is 1 and 11
    if (ones === 1 && hundreds !== 11) {
        return `${i}st`;
    }
    // if the remainder is 2 and 12
    if (ones === 2 && hundreds !== 12) {
        return `${i}nd`;
    }
    // if the remainder is 3 and 13
    if (ones === 3 && hundreds !== 13) {
        return `${i}rd`;
    }
    return `${i}th`;
};

const stepperNode = (index) => <div className="stepper-node">{ordinal_suffix_of(index)}</div>;

export default function HorizontalStepper(props) {
    // a listener that checks the screen width
    const listener = useWindowSize();

    // custom styling used for various components
    const useStyles = makeStyles(() => ({
        stepDiv: {
            minHeight: "calc(10.5px)",
        },
        button: {
            width: "45px",
            height: "45px",
            backgroundColor: "white",
            border: `2px solid ${props.color}`,
            borderRadius: "50%",
            fontWeight: "400",
            color: `${props.color}`,
            margin: "0",
            marginRight: "10px",
            padding: "0",
            zIndex: "100",
        },
        buttonActive: {
            width: "45px",
            height: "45px",
            backgroundColor: `${props.color}`,
            border: `2px solid ${props.color}`,
            borderRadius: "50%",
            color: "white",
            fontWeight: "400",
            margin: "0",
            marginRight: "10px",
            padding: "0",
            zIndex: "100",
        },
    }));

    // custom styling for the connectors on the stepper
    const ColorlibConnector = withStyles({
        lineHorizontal: {
            width: "55px",
            height: "2px",
            border: 0,
            backgroundColor: props.color,
            borderRadius: 1,
            marginTop: "calc(10px)",
            marginLeft: "calc(-1.6px)",
        },
    })(StepConnector);

    /**
     * Return all the locations and conference number as an array
     * @returns array
     */
    function getSteps() {
        const arr = [];
        for (let i = 0; i < props.items.length; i++) {
            const obj = {};
            const two = props.items[i].location.split(",").splice(1, 1);
            obj.location = two;
            obj.number = props.items[i].number;

            arr.push(obj);
        }

        return arr;
    }

    // import the styling
    const classes = useStyles();
    // keep track of the current page for pagination
    const [activeStep, setActiveStep] = useState(0);
    // update the page if the user changes pages
    const [activeIndex, setActiveIndex] = useState(0);
    // indicies to render 9 items per page
    const [indices, setIndices] = useState([0, 4]);
    // steps that are split based on indices
    const [splitSteps, setSplitSteps] = useState(getSteps());

    // initial call to get all steps
    const steps = getSteps();

    useEffect(() => {
        if (listener.width > 600) {
            setIndices([0, 6]);
        } else setIndices([0, 4]);
    }, [listener]);

    // render only the first nine items
    useEffect(() => {
        setSplitSteps(steps.slice(indices[0], indices[1]));
    }, []);

    // update the items on the stepper when the indices updates
    useEffect(() => {
        setSplitSteps(steps.slice(indices[0], indices[1]));
    }, [indices]);

    /**
     * When an item in the stepper is clicked, it's parent
     * index is updated accordingly
     *
     * @param {index} step
     */
    const handleStep = (step) => {
        setActiveStep(indices[0] + step);
        setActiveIndex(step);
        props.setParentIndex(indices[0] + step);
    };

    /**
     * Update the stepper to render the 9 items depending on the page
     * @param {number} index
     */
    const updatePage = (index) => {
        // determine if it is a mobile screen or tablet
        const size = listener.width < 601 ? 4 : 6;
        // update the indices range
        setIndices([(index - 1) * size, index * size]);
        // when updating to new page, set the active index to 0
        setActiveIndex(0);
        // update the parent index to display proper information
        props.setParentIndex((index - 1) * size);
    };

    return (
        <div className={classes.root}>
            <Stepper
                alternativeLabel
                nonLinear
                activeStep={activeStep}
                connector={<ColorlibConnector />}
            >
                {splitSteps.map((step, index) => (
                    <Step>
                        <StepButton
                            onClick={() => handleStep(index)}
                            icon={stepperNode(step.number)}
                            classes={
                                activeIndex === index
                                    ? { root: classes.buttonActive }
                                    : { root: classes.button }
                            }
                        />
                    </Step>
                ))}
            </Stepper>

            <div className="pagination-stepper">
                <CustomPagination
                    count={steps.length}
                    updatePage={updatePage}
                    size={listener.width < 601 ? 4 : 6}
                />
            </div>
        </div>
    );
}
