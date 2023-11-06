import { HangmanBodyPart, HangmanValue } from "../type";
import { ArrayUtils, ObjectUtils } from "../utils";

interface IUpdateHangmanProps {
	char: string;
	hangmanValue: HangmanValue;
	hangmanBodyPart: HangmanBodyPart;
}

interface IUpdateHangmanExports {
	hangmanValue: HangmanValue;
	hangmanBodyPart: HangmanBodyPart;
}

interface IGameUtilsExports {
	isWordGuessed: (word: string, chars: Array<string>) => boolean;
	isKeyPressed: (chars: Array<string>, hangmanValue: HangmanValue, key: string) => boolean;
	splitWord: (word: string) => Array<string>;
	calculateHints: (word: string) => number;
	getChars: (word: string, chars: Array<string>) => Array<string | undefined>;
	getHint: (word: string, chars: Array<string>) => string;
	getProgress: (word: string, chars: Array<string>) => number;
	addChars: (chars: Array<string>, key: string) => Array<string>;
	updateHangman: (props: IUpdateHangmanProps) => IUpdateHangmanExports;
}

export const useGameUtils = (): IGameUtilsExports => {
	const isWordGuessed = (word: string, chars: Array<string>): boolean => {
		const pieces: Array<string> = splitWord(word);
		return pieces.every((char) => chars.includes(char));
	};

	const isKeyPressed = (chars: Array<string>, hangmanValue: HangmanValue, key: string): boolean => {
		const keys: Array<string | undefined> = ArrayUtils.append(
			chars,
			hangmanValue.head,
			hangmanValue.body,
			hangmanValue.leftArm,
			hangmanValue.rightArm,
			hangmanValue.leftLeg,
			hangmanValue.rightLeg
		);
		return keys.includes(key);
	};

	const splitWord = (word: string): Array<string> => {
		return word.split("");
	};

	const calculateHints = (word: string): number => {
		const weightage: number = 3;
		return Math.floor(word.length / weightage);
	};

	const getChars = (word: string, chars: Array<string>): Array<string | undefined> => {
		const pieces: Array<string> = splitWord(word);
		return pieces.map((piece) => (chars.includes(piece) ? piece : undefined));
	};

	const getHint = (word: string, chars: Array<string>): string => {
		const pieces: Array<string> = splitWord(word);
		const filteredPieces = pieces.filter((piece) => !chars.includes(piece));
		return ArrayUtils.random(filteredPieces);
	};

	const getProgress = (word: string, chars: Array<string>): number => {
		const characters: Array<string | undefined> = getChars(word, chars);
		const filteredChars: Array<string | undefined> = characters.filter((char) => char !== undefined);
		return (100 * filteredChars.length) / word.length;
	};

	const addChars = (chars: Array<string>, key: string): Array<string> => {
		return ArrayUtils.append(chars, key);
	};

	const updateHangman = (props: IUpdateHangmanProps): IUpdateHangmanExports => {
		const hangmanValue: HangmanValue = ObjectUtils.clone(props.hangmanValue);
		const hangmanBodyPart: HangmanBodyPart = ObjectUtils.clone(props.hangmanBodyPart);
		let isUpdated: boolean = false;

		if (!isUpdated && hangmanValue.head === undefined && hangmanBodyPart.head === false) {
			hangmanValue.head = props.char;
			hangmanBodyPart.head = true;
			isUpdated = true;
		} else if (!isUpdated && hangmanValue.body === undefined && hangmanBodyPart.body === false) {
			hangmanValue.body = props.char;
			hangmanBodyPart.body = true;
			isUpdated = true;
		} else if (!isUpdated && hangmanValue.leftLeg === undefined && hangmanBodyPart.leftLeg === false) {
			hangmanValue.leftLeg = props.char;
			hangmanBodyPart.leftLeg = true;
			isUpdated = true;
		} else if (!isUpdated && hangmanValue.rightLeg === undefined && hangmanBodyPart.rightLeg === false) {
			hangmanValue.rightLeg = props.char;
			hangmanBodyPart.rightLeg = true;
			isUpdated = true;
		} else if (!isUpdated && hangmanValue.leftArm === undefined && hangmanBodyPart.leftArm === false) {
			hangmanValue.leftArm = props.char;
			hangmanBodyPart.leftArm = true;
			isUpdated = true;
		} else if (!isUpdated && hangmanValue.rightArm === undefined && hangmanBodyPart.rightArm === false) {
			hangmanValue.rightArm = props.char;
			hangmanBodyPart.rightArm = true;
			isUpdated = true;
		}
		return { hangmanValue, hangmanBodyPart };
	};

	return { isWordGuessed, isKeyPressed, splitWord, calculateHints, getChars, getHint, getProgress, addChars, updateHangman };
};
