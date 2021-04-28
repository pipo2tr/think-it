import { Accordion, AccordionSummary, Box, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { FC } from "react";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
          },
	})
);

interface PaginatorMessageProps {
	text: string;
}

const PaginatorMessage: FC<PaginatorMessageProps> = ({ text }) => {
	const classes = useStyles();
	return (
        <Accordion disabled>
        <AccordionSummary
          aria-controls="no-more-content"
          id="panel3a-header"
        >
                <Typography className={classes.heading}>{text}</Typography>
        </AccordionSummary>
      </Accordion>
	);
};

export default PaginatorMessage;
