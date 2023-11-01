import { UseToastOptions } from "@chakra-ui/react";
import { FINISHED_TOAST_LABEL, KEY_PRESSED_TOAST_LABEL, LOSE_TOAST_LABEL, NOT_STARTED_TOAST_LABEL, WON_TOAST_LABEL } from "../constants";
import { IHangmanBodyPart, IHangmanValue } from "../interfaces";
import { replaceMessageParams } from "../utils";

interface IDefaultValuesExports {
	defaultChars: Array<string>;
	defaultHintCount: number;
	defaultHangmanValue: IHangmanValue;
	defaultHangmanBodyPart: IHangmanBodyPart;
	keyPressedToastOptions: (key: string) => UseToastOptions;
	notStartedToastOptions: UseToastOptions;
	finishedToastOptions: UseToastOptions;
	loseToastOptions: UseToastOptions;
	wonToastOptions: UseToastOptions;
}

export const useDefaultValues = (): IDefaultValuesExports => {
	const defaultChars: Array<string> = [];
	const defaultHintCount: number = 0;

	const defaultHangmanValue: IHangmanValue = {
		head: undefined,
		body: undefined,
		leftArm: undefined,
		rightArm: undefined,
		leftLeg: undefined,
		rightLeg: undefined,
	};

	const defaultHangmanBodyPart: IHangmanBodyPart = {
		head: false,
		body: false,
		leftArm: false,
		rightArm: false,
		leftLeg: false,
		rightLeg: false,
	};

	const keyPressedToastOptions = (key: string): UseToastOptions => {
		return {
			id: "key-pressed-" + key,
			title: replaceMessageParams(KEY_PRESSED_TOAST_LABEL, key),
			isClosable: true,
			position: "top-right",
			status: "warning",
			duration: 2500,
		};
	};

	const notStartedToastOptions: UseToastOptions = {
		id: "not-started",
		title: NOT_STARTED_TOAST_LABEL,
		isClosable: true,
		position: "top-right",
		status: "info",
		duration: 2500,
	};

	const finishedToastOptions: UseToastOptions = {
		id: "finished",
		title: FINISHED_TOAST_LABEL,
		isClosable: true,
		position: "top-right",
		status: "info",
		duration: 2500,
	};

	const loseToastOptions: UseToastOptions = {
		id: "lose",
		title: LOSE_TOAST_LABEL,
		isClosable: true,
		position: "top-right",
		status: "error",
		duration: 2500,
	};

	const wonToastOptions: UseToastOptions = {
		id: "won",
		title: WON_TOAST_LABEL,
		isClosable: true,
		position: "top-right",
		status: "success",
		duration: 2500,
	};

	return {
		defaultChars,
		defaultHintCount,
		defaultHangmanValue,
		defaultHangmanBodyPart,
		keyPressedToastOptions,
		notStartedToastOptions,
		finishedToastOptions,
		loseToastOptions,
		wonToastOptions,
	};
};
