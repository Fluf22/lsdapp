import { createStyles, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Categories from './categories';

const useStyles = makeStyles((theme) => createStyles({
	root: {
		height: "calc(100% - 64px)"
	},
	categorySelector: {
		height: "10%"
	},
	movieCards: {
		height: "90%"
	}
}));

const Movies = () => {
	const classes = useStyles();

	return (
		<Grid container direction="column" className={classes.root}>
			<Grid item className={classes.categorySelector}>
				<Categories category="movies" />
			</Grid>
			<Grid item container direction="column" className={classes.movieCards} justify="space-around">
			</Grid>
		</Grid>
	);
};

export default Movies;
