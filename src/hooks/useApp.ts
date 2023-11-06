import { useCallback, useEffect, useMemo, useState } from "react";
import { useDefaultValues, useFetchWords, useGameUtils, useKeyBinding, useToast, useToastOptions } from ".";
import { HangmanBodyPart, HangmanValue } from "../type";

interface IAppExports {
	word: string | undefined;
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
	const { isWordGuessed, isKeyPressed, splitWord, calculateHints, getHint, addChars, updateHangman } = useGameUtils();
	const { notStartedToastOptions, keyPressedToastOptions, finishedToastOptions, loseToastOptions, wonToastOptions } = useToastOptions();

	const isFinished = useMemo((): boolean => {
		if (word !== undefined) {
			return hangmanBodyPart.rightArm === true || isWordGuessed(word, chars);
		} else {
			return false;
		}
	}, [hangmanBodyPart.rightArm, chars, isWordGuessed, word]);

	const resetGame = useCallback((): void => {
		setWord(undefined);
		setChars(defaultChars);
		setHints(defaultHints);
		setHangmanValue(defaultHangmanValue);
		setHangmanBodyPart(defaultHangmanBodyPart);
	}, [defaultChars, defaultHangmanBodyPart, defaultHangmanValue, defaultHints]);

	const updateGame = useCallback(
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
		[addChars, hangmanBodyPart, chars, updateHangman, hangmanValue, word]
	);

	const finishGame = useCallback((): void => {
		if (word !== undefined) {
			if (isWordGuessed(word, chars)) {
				toast(wonToastOptions);
			} else {
				toast(loseToastOptions);
			}
		}
	}, [chars, isWordGuessed, loseToastOptions, toast, wonToastOptions, word]);

	const onKeyPress = useCallback(
		(key: string): void => {
			if (key !== undefined) {
				if (!isStarted) {
					toast(notStartedToastOptions);
				} else if (isFinished) {
					toast(finishedToastOptions);
				} else if (isKeyPressed(chars, hangmanValue, key.toUpperCase())) {
					toast(keyPressedToastOptions(key.toUpperCase()));
				} else {
					updateGame(key.toUpperCase());
				}
			}
		},
		[chars, finishedToastOptions, hangmanValue, isFinished, isKeyPressed, isStarted, keyPressedToastOptions, notStartedToastOptions, toast, updateGame]
	);

	const onClickStart = (): void => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setIsStarted(true);
		}, 300);
	};

	const onClickReplay = (): void => {
		setIsStarted(false);
		setIsSolved(false);
		setIsEnded(false);
		resetGame();
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

	useEffect(() => {
		if (isLoaded && word === undefined) {
			setTimeout(() => {
				const text = getWord().toUpperCase();
				setWord(text);
				setHints(calculateHints(text));
			}, 500);
		}
	}, [calculateHints, getWord, isLoaded, word]);

	useEffect(() => {
		if (isFinished && !isEnded) {
			setIsEnded(true);
			finishGame();
		}
	}, [finishGame, isEnded, isFinished]);

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
