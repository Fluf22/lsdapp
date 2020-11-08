import React, { useEffect } from 'react';
import { CircularProgress, createStyles, Grid, makeStyles, Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { useMovies } from '../queries';
import { usePagination } from '../hooks';
import { Pagination } from '@material-ui/lab';
import Movie from './movie';

const useStyles = makeStyles(() => createStyles({
	root: {
		height: "100%"
	},
	categorySelector: {
		height: "10%"
	},
	movieCards: {
		height: "85%"
	},
	loader: {
		height: "100%",
		width: "100%"
	},
	pagination: {
		height: "5%",
		backgroundColor: "#ffffff"
	},
	errorIcon: {
		fontSize: "80px",
	},
	errorText: {
		fontSize: "40px",
	}
}));

const Movies = () => {
	const classes = useStyles();
	const { isLoading, isError, error, data } = useMovies();
	const {
		isPaginationReady,
		paginatedData: movies,
		pageCount,
		pageIndex,
		onPaginationChange
	} = usePagination(data?.docs ?? [], 1);

	useEffect(() => {
		if (isError) {
			console.error("Error during movies query: ", error);
		}
	}, [isError, error]);

	return (
		<Grid container direction="column" className={classes.root} justify="space-between">
			<Grid item container direction="column" className={classes.movieCards} justify="space-around" alignItems="center">
			{
					isLoading ? (
						<Grid item container justify="center" alignItems="center" className={classes.loader}>
							<CircularProgress color="secondary" />
						</Grid>
					) : (
							isError ? (
								<Grid item container direction="column" justify="center" alignItems="center">
									<WarningIcon className={classes.errorIcon} />
									<Typography className={classes.errorIcon}>An error as occured</Typography>
									<Typography className={classes.errorIcon}>Please reload the page</Typography>
								</Grid>
							) : (
								movies.map((movie: any, idx: number) => (
									<Movie key={idx} movie={movie} />
								))
							)
						)
				}
			</Grid>
			{
				isPaginationReady ? (
					<Grid item container justify="center" alignItems="center" className={classes.pagination}>
						<Pagination variant="text" color="primary" boundaryCount={2} count={pageCount} page={pageIndex} onChange={(_, page) => onPaginationChange(page)} />
					</Grid>
				) : ("")
			}
		</Grid>
	);
};

export default Movies;
