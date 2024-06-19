import { useCallback, useEffect, useMemo, useState } from "react";
import { useAxiosRequest } from ".";
import { RANDOM_WORD_API } from "../constants";
import data from "../data/data.json";
import { ArrayUtils } from "../utils";

interface IAPIResponse {
	data: Array<string>;
	status: number;
	statusText: string;
}

interface IFetchWordsExports {
	isLoaded: boolean;
	getWord: () => string;
}

export const useFetchWords = (): IFetchWordsExports => {
	const [words, setWords] = useState<Array<string>>([]);

	const onSuccess = (response: IAPIResponse): void => setWords(response.data);
	const onFailure = (): void => setWords(data);

	const { isLoading, forceReload } = useAxiosRequest<IAPIResponse>({
		method: "GET",
		endpoint: RANDOM_WORD_API,
		onSuccess: onSuccess,
		onFailure: onFailure,
	});

	useEffect(() => {
		if (words?.length === 0 && !isLoading) {
			forceReload();
		}
	}, [forceReload, isLoading, words?.length]);

	const isLoaded = useMemo((): boolean => {
		return words.length > 0;
	}, [words.length]);

	const getWord = useCallback((): string => {
		return ArrayUtils.random(words);
	}, [words]);

	return { isLoaded, getWord };
};
