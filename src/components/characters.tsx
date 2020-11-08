import React, { useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CircularProgress, createStyles, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { useCharacters } from '../queries';
import { Pagination } from '@material-ui/lab';
import { useFuzzySearch, usePagination } from '../hooks';

const useStyles = makeStyles(() => createStyles({
	root: {
		height: "100%"
	},
	categorySelector: {
		height: "10%"
	},
	main: {
		height: "85%"
	},
	searchBar: {
		height: "10%",
		paddingLeft: "70px"
	},
	searchBarInput: {
		backgroundColor: "#896f4c",
		borderRadius: "5px"
	},
	characterCards: {
		height: "90%",
		padding: "70px"
	},
	characterCard: {
		width: "310px",
		height: "170px"
	},
	pagination: {
		height: "5%",
		backgroundColor: "#ffffff"
	},
	loader: {
		height: "100%",
		width: "100%"
	},
	errorIcon: {
		fontSize: "80px",
	},
	errorText: {
		fontSize: "40px",
	}
}));

const Characters = () => {
	const classes = useStyles();
	const { isLoading, isError, error, data } = useCharacters();
	const { filteredData, onSearchTermChange } = useFuzzySearch(data?.docs ?? []);
	const {
		isPaginationReady,
		paginatedData: characters,
		pageCount,
		pageIndex,
		onPaginationChange
	} = usePagination(filteredData);

	useEffect(() => {
		if (isError) {
			console.error("Error during characters query: ", error);
		}
	}, [isError, error]);

	return (
		<Grid container direction="column" className={classes.root} justify="space-between">
			<Grid item container direction="row" justify="space-between" className={classes.main}>
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
									<>
										<Grid item container alignItems="center" className={classes.searchBar}>
											<TextField id="character-fuzzy-search" type="search" label="Search character" variant="filled" color="secondary" className={classes.searchBarInput} onChange={({ target: { value: searchTerm }}) => onSearchTermChange(searchTerm)} />
										</Grid>
										<Grid item container direction="row" justify="space-between" className={classes.characterCards}>
											{
												characters.map((character: any, idx: number) => (
													<Card key={idx} className={classes.characterCard}>
														<CardContent>
															<Typography color="textSecondary" gutterBottom>
																{character.race}
															</Typography>
															<Typography variant="h5" component="h2">
																{character.name}
															</Typography>
															<Typography color="textSecondary">
																{character.gender}
															</Typography>
															<Typography variant="body2" component="p">
															</Typography>
														</CardContent>
														{
															character.wikiUrl !== "" ? (
																<CardActions>
																	<Button onClick={() => window.open(character.wikiUrl, '_blank')} size="small">Learn More</Button>
																</CardActions>
															) : ("")
														}
													</Card>
												))
											}
										</Grid>

									</>
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

export default Characters;
