import { useCallback, useEffect, useMemo, useState } from "react";
import { useDefaultValues, useFetchWords, useGameUtils, useKeyBinding, useToast } from ".";
import { IHangmanBodyPart, IHangmanValue } from "../interfaces";

interface IAppExports {
	word: string | undefined;
	chars: Array<string>;
	hintCount: number;
	value: IHangmanValue;
	bodyPart: IHangmanBodyPart;
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
	const {
		defaultChars,
		defaultHintCount,
		defaultHangmanValue,
		defaultHangmanBodyPart,
		keyPressedToastOptions,
		notStartedToastOptions,
		finishedToastOptions,
		loseToastOptions,
		wonToastOptions,
	} = useDefaultValues();

	const [word, setWord] = useState<string | undefined>(undefined);
	const [chars, setChars] = useState<Array<string>>(defaultChars);
	const [hintCount, setHintCount] = useState<number>(defaultHintCount);
	const [value, setValue] = useState<IHangmanValue>(defaultHangmanValue);
	const [bodyPart, setBodyPart] = useState<IHangmanBodyPart>(defaultHangmanBodyPart);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [isPressed, setIsPressed] = useState<boolean>(false);
	const [isSolved, setIsSolved] = useState<boolean>(false);
	const [isEnded, setIsEnded] = useState<boolean>(false);

	const { toast } = useToast();
	const { isLoaded, getWord } = useFetchWords();
	const { key } = useKeyBinding({ setIsPressed: setIsPressed });
	const { isWordGuessed, isKeyPressed, calculateHintCount, splitWord, getHint, addChars, updateHangman } = useGameUtils();

	const isFinished = useMemo((): boolean => {
		if (word !== undefined) {
			return bodyPart.rightArm === true || isWordGuessed(word, chars);
		} else {
			return false;
		}
	}, [bodyPart.rightArm, chars, isWordGuessed, word]);

	const resetGame = useCallback((): void => {
		setWord(undefined);
		setChars(defaultChars);
		setHintCount(defaultHintCount);
		setValue(defaultHangmanValue);
		setBodyPart(defaultHangmanBodyPart);
	}, [defaultChars, defaultHangmanBodyPart, defaultHangmanValue, defaultHintCount]);

	const updateGame = useCallback(
		(char: string): void => {
			if (word !== undefined) {
				if (word.includes(char)) {
					const updatedChars = addChars(chars, char);
					setChars(updatedChars);
				} else {
					const { value: updatedValue, bodyPart: updatedBodyPart } = updateHangman({ char: char, value: value, bodyPart: bodyPart });
					setValue(updatedValue);
					setBodyPart(updatedBodyPart);
				}
			}
		},
		[addChars, bodyPart, chars, updateHangman, value, word]
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
		(char: string): void => {
			if (!isStarted) {
				toast(notStartedToastOptions);
			} else if (isFinished) {
				toast(finishedToastOptions);
			} else if (isKeyPressed(chars, value, char)) {
				toast(keyPressedToastOptions(char));
			} else {
				updateGame(char);
			}
		},
		[chars, finishedToastOptions, isFinished, isKeyPressed, isStarted, keyPressedToastOptions, notStartedToastOptions, toast, updateGame, value]
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
	};

	const onClickHint = (): void => {
		if (hintCount > 0 && word !== undefined) {
			const char = getHint(word, chars);
			setChars(addChars(chars, char));
			setHintCount((current) => current - 1);
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
				setHintCount(calculateHintCount(text));
			}, 500);
		}
	}, [calculateHintCount, getWord, isLoaded, word]);

	useEffect(() => {
		if (isPressed && key !== undefined) {
			setIsPressed(false);
			onKeyPress(key.toUpperCase());
		}
	}, [key, isPressed, onKeyPress]);

	useEffect(() => {
		if (isFinished && !isEnded) {
			setIsEnded(true);
			finishGame();
		}
	}, [finishGame, isEnded, isFinished]);

	return { word, chars, hintCount, value, bodyPart, isLoading, isStarted, isSolved, isEnded, onClickStart, onClickReplay, onClickHint, onClickSolve };
};
