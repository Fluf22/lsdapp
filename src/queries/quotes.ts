import axios, { AxiosRequestConfig } from "axios";
import { useQuery } from "react-query";

const useQuotes = (movieID: string, axiosCfg: AxiosRequestConfig) => {
	return useQuery(["quotes", movieID], () => axios.request({
		url: movieID !== "" ? `/movie/${movieID}/quote` : "/quote",
		...axiosCfg
	}).then((res) => res.data));
};

export default useQuotes;
