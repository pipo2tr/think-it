import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { FC } from "react";
import TabContainer from "./TabContainer";

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));
interface TabPanelProps {
	panel: number;
	handlePanel: (event: React.ChangeEvent<{}>, newValue: number) => void;
}
const TabPanel: FC<TabPanelProps> = ({ panel, handlePanel, children }) => {
	const classes = useStyles();
	

	return (
		<div className={classes.root}>
			<Paper square>
				<Tabs
					indicatorColor="primary"
					textColor="primary"
					value={panel}
					onChange={handlePanel}
					aria-label="simple tabs example"
					centered
				>
					<Tab label="Posts" {...a11yProps(0)} />
					<Tab label="Comments" {...a11yProps(1)} />
				</Tabs>
				{children}
			</Paper>
		</div>
	);
};

export default TabPanel;
