import { IHangmanBodyPart, IHangmanValue } from "../interfaces";
import { append, clone, random, split } from "../utils";

interface IUpdateHangmanProps {
	char: string;
	value: IHangmanValue;
	bodyPart: IHangmanBodyPart;
}

interface IUpdateHangmanExports {
	value: IHangmanValue;
	bodyPart: IHangmanBodyPart;
}

interface IGameUtilsExports {
	isWordGuessed: (word: string, chars: Array<string>) => boolean;
	isKeyPressed: (chars: Array<string>, value: IHangmanValue, key: string) => boolean;
	calculateHintCount: (word: string) => number;
	splitWord: (word: string) => Array<string>;
	getChars: (word: string, chars: Array<string>) => Array<string | undefined>;
	getHint: (word: string, chars: Array<string>) => string;
	getProgress: (word: string, chars: Array<string>) => number;
	addChars: (chars: Array<string>, key: string) => Array<string>;
	updateHangman: (value: IUpdateHangmanProps) => IUpdateHangmanExports;
}

export const useGameUtils = (): IGameUtilsExports => {
	const isWordGuessed = (word: string, chars: Array<string>): boolean => {
		const pieces: Array<string> = split(word);
		return pieces.every((char) => chars.includes(char));
	};

	const isKeyPressed = (chars: Array<string>, value: IHangmanValue, key: string): boolean => {
		const keys = append(chars, value.head, value.body, value.leftArm, value.rightArm, value.leftLeg, value.rightLeg);
		return keys.includes(key);
	};

	const calculateHintCount = (word: string): number => {
		const weightage: number = 3;
		return Math.floor(word.length / weightage);
	};

	const splitWord = (word: string): Array<string> => {
		return split(word);
	};

	const getChars = (word: string, chars: Array<string>): Array<string | undefined> => {
		const pieces: Array<string> = split(word);
		return pieces.map((piece) => (chars.includes(piece) ? piece : undefined));
	};

	const getHint = (word: string, chars: Array<string>): string => {
		const pieces: Array<string> = split(word);
		const filteredPieces = pieces.filter((piece) => !chars.includes(piece));
		return random(filteredPieces);
	};

	const getProgress = (word: string, chars: Array<string>): number => {
		const characters: Array<string | undefined> = getChars(word, chars);
		const filteredChars: Array<string | undefined> = characters.filter((char) => char !== undefined);
		return (100 * filteredChars.length) / word.length;
	};

	const addChars = (chars: Array<string>, key: string): Array<string> => {
		return append(chars, key);
	};

	const updateHangman = (props: IUpdateHangmanProps): IUpdateHangmanExports => {
		const value: IHangmanValue = clone(props.value);
		const bodyPart: IHangmanBodyPart = clone(props.bodyPart);
		let isUpdated: boolean = false;

		if (!isUpdated && value.head === undefined && bodyPart.head === false) {
			value.head = props.char;
			bodyPart.head = true;
			isUpdated = true;
		} else if (!isUpdated && value.body === undefined && bodyPart.body === false) {
			value.body = props.char;
			bodyPart.body = true;
			isUpdated = true;
		} else if (!isUpdated && value.leftLeg === undefined && bodyPart.leftLeg === false) {
			value.leftLeg = props.char;
			bodyPart.leftLeg = true;
			isUpdated = true;
		} else if (!isUpdated && value.rightLeg === undefined && bodyPart.rightLeg === false) {
			value.rightLeg = props.char;
			bodyPart.rightLeg = true;
			isUpdated = true;
		} else if (!isUpdated && value.leftArm === undefined && bodyPart.leftArm === false) {
			value.leftArm = props.char;
			bodyPart.leftArm = true;
			isUpdated = true;
		} else if (!isUpdated && value.rightArm === undefined && bodyPart.rightArm === false) {
			value.rightArm = props.char;
			bodyPart.rightArm = true;
			isUpdated = true;
		}
		return { value, bodyPart };
	};

	return { isWordGuessed, isKeyPressed, calculateHintCount, splitWord, getChars, getHint, getProgress, addChars, updateHangman };
};
