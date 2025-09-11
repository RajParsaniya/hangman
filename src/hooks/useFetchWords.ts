import { useCallback, useEffect, useMemo, useState } from "react";
import { useAxiosRequest } from ".";
import { DEFAULT_WORD, RANDOM_WORDS } from "../constants";
import { EMethod } from "../enums";
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
	const onFailure = (): void => setWords([DEFAULT_WORD]);

	const { isLoading, forceReload } = useAxiosRequest<IAPIResponse>({
		method: EMethod.GET,
		endpoint: RANDOM_WORDS,
		onSuccess: onSuccess,
		onFailure: onFailure,
	});

	useEffect((): void => {
		if (words?.length === 0 && !isLoading) {
			forceReload();
		}
	}, [forceReload, isLoading, words]);

	const isLoaded = useMemo((): boolean => {
		return words.length > 0;
	}, [words]);

	const getWord = useCallback((): string => {
		const word = ArrayUtils.random(words);
		setWords(ArrayUtils.remove(words, word));
		return word;
	}, [words]);

	return { isLoaded, getWord };
};
