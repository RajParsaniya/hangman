import { HangmanBodyPart, HangmanValue } from "../type";

interface IDefaultValuesExports {
	defaultChars: Array<string>;
	defaultHints: number;
	defaultHangmanValue: HangmanValue;
	defaultHangmanBodyPart: HangmanBodyPart;
}

export const useDefaultValues = (): IDefaultValuesExports => {
	const defaultChars: Array<string> = [];
	const defaultHints: number = 0;

	const defaultHangmanValue: HangmanValue = {
		head: undefined,
		body: undefined,
		leftArm: undefined,
		rightArm: undefined,
		leftLeg: undefined,
		rightLeg: undefined,
	};

	const defaultHangmanBodyPart: HangmanBodyPart = {
		head: false,
		body: false,
		leftArm: false,
		rightArm: false,
		leftLeg: false,
		rightLeg: false,
	};

	return { defaultChars, defaultHints, defaultHangmanValue, defaultHangmanBodyPart };
};
