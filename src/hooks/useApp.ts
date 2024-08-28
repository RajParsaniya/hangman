import { useCallback, useEffect, useMemo, useState } from "react";
import { useCore, useDefaultValues, useFetchWords, useKeyBinding, useToast, useToastOptions } from ".";
import { HangmanBodyPart, HangmanValue } from "../type";

interface IAppExports {
	word?: string;
	chars: Array<string>;
	hints: number;
	hangmanValue: HangmanValue;
	hangmanBodyPart: HangmanBodyPart;
	isLoading: boolean;
	isStarted: boolean;
	isSolved: boolean;
	isEnded: boolean;
	onClickStart: () => void;
	onClickReplay: () => void;
	onClickHint: () => void;
	onClickSolve: () => void;
}

export const useApp = (): IAppExports => {
	const { defaultChars, defaultHints, defaultHangmanValue, defaultHangmanBodyPart } = useDefaultValues();

	const [word, setWord] = useState<string | undefined>(undefined);
	const [chars, setChars] = useState<Array<string>>(defaultChars);
	const [hints, setHints] = useState<number>(defaultHints);
	const [hangmanValue, setHangmanValue] = useState<HangmanValue>(defaultHangmanValue);
	const [hangmanBodyPart, setHangmanBodyPart] = useState<HangmanBodyPart>(defaultHangmanBodyPart);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [isSolved, setIsSolved] = useState<boolean>(false);
	const [isEnded, setIsEnded] = useState<boolean>(false);

	const { toast, closeAll } = useToast();
	const { isLoaded, getWord } = useFetchWords();
	const { isWordGuessed, isKeyPressed, splitWord, calculateHints, getHint, addChars, updateHangman } = useCore();
	const { getNotStartedToastOptions, getFinishedToastOptions, getLoseToastOptions, getWonToastOptions, getKeyPressedToastOptions } = useToastOptions();

	const isFinished = useMemo((): boolean => {
		if (word !== undefined) {
			return hangmanBodyPart.rightArm === true || isWordGuessed(word, chars);
		} else {
			return false;
		}
	}, [chars, hangmanBodyPart, isWordGuessed, word]);

	const onResetGame = useCallback((): void => {
		setWord(undefined);
		setChars(defaultChars);
		setHints(defaultHints);
		setHangmanValue(defaultHangmanValue);
		setHangmanBodyPart(defaultHangmanBodyPart);
	}, [defaultChars, defaultHangmanBodyPart, defaultHangmanValue, defaultHints]);

	const onFinishGame = useCallback((): void => {
		if (word !== undefined) {
			if (isWordGuessed(word, chars)) {
				toast(getWonToastOptions);
			} else {
				toast(getLoseToastOptions);
			}
		}
	}, [chars, getLoseToastOptions, getWonToastOptions, isWordGuessed, toast, word]);

	const onUpdateGame = useCallback(
		(char: string): void => {
			if (word !== undefined) {
				if (word.includes(char)) {
					const updatedChars = addChars(chars, char);
					setChars(updatedChars);
				} else {
					const { hangmanValue: updatedHangmanValue, hangmanBodyPart: updatedHangmanBodyPart } = updateHangman({
						char: char,
						hangmanValue: hangmanValue,
						hangmanBodyPart: hangmanBodyPart,
					});
					setHangmanValue(updatedHangmanValue);
					setHangmanBodyPart(updatedHangmanBodyPart);
				}
			}
		},
		[addChars, chars, hangmanBodyPart, hangmanValue, updateHangman, word]
	);

	const onKeyPress = useCallback(
		(key: string): void => {
			if (key !== undefined) {
				if (!isStarted) {
					toast(getNotStartedToastOptions);
				} else if (isFinished) {
					toast(getFinishedToastOptions);
				} else if (isKeyPressed(chars, hangmanValue, key.toUpperCase())) {
					toast(getKeyPressedToastOptions(key.toUpperCase()));
				} else {
					onUpdateGame(key.toUpperCase());
				}
			}
		},
		[
			chars,
			getFinishedToastOptions,
			getKeyPressedToastOptions,
			getNotStartedToastOptions,
			hangmanValue,
			isFinished,
			isKeyPressed,
			isStarted,
			toast,
			onUpdateGame,
		]
	);

	const onClickStart = (): void => {
		setIsLoading(true);
		setTimeout((): void => {
			setIsLoading(false);
			setIsStarted(true);
		}, 300);
	};

	const onClickReplay = (): void => {
		setIsStarted(false);
		setIsSolved(false);
		setIsEnded(false);
		onResetGame();
		closeAll();
	};

	const onClickHint = (): void => {
		if (hints > 0 && word !== undefined) {
			const char = getHint(word, chars);
			setChars(addChars(chars, char));
			setHints((current) => current - 1);
		}
	};

	const onClickSolve = (): void => {
		if (word !== undefined) {
			setIsSolved(true);
			setChars(splitWord(word));
		}
	};

	useEffect((): void => {
		if (isLoaded && word === undefined) {
			setTimeout((): void => {
				const text = getWord().toUpperCase();
				setWord(text);
				setHints(calculateHints(text));
			}, 500);
		}
	}, [calculateHints, getWord, isLoaded, word]);

	useEffect((): void => {
		if (isFinished && !isEnded) {
			setIsEnded(true);
			onFinishGame();
		}
	}, [onFinishGame, isEnded, isFinished]);

	useKeyBinding({ onPress: onKeyPress });

	return {
		word,
		chars,
		hints,
		hangmanValue,
		hangmanBodyPart,
		isLoading,
		isStarted,
		isSolved,
		isEnded,
		onClickStart,
		onClickReplay,
		onClickHint,
		onClickSolve,
	};
};
