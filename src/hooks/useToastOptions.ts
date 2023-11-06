import { UseToastOptions } from "@chakra-ui/react";
import { FINISHED_TOAST_LABEL, KEY_PRESSED_TOAST_LABEL, LOSE_TOAST_LABEL, NOT_STARTED_TOAST_LABEL, WON_TOAST_LABEL } from "../constants";
import { StringUtils } from "../utils";

interface IToastOptionsExports {
	notStartedToastOptions: UseToastOptions;
	keyPressedToastOptions: (key: string) => UseToastOptions;
	finishedToastOptions: UseToastOptions;
	loseToastOptions: UseToastOptions;
	wonToastOptions: UseToastOptions;
}

export const useToastOptions = (): IToastOptionsExports => {
	const notStartedToastOptions: UseToastOptions = {
		id: "not-started",
		title: NOT_STARTED_TOAST_LABEL,
		isClosable: true,
		position: "top-right",
		status: "warning",
		duration: 2500,
	};

	const keyPressedToastOptions = (key: string): UseToastOptions => {
		return {
			id: "key-pressed-" + key,
			title: StringUtils.replace(KEY_PRESSED_TOAST_LABEL, key),
			isClosable: true,
			position: "top-right",
			status: "warning",
			duration: 2500,
		};
	};

	const finishedToastOptions: UseToastOptions = {
		id: "finished",
		title: FINISHED_TOAST_LABEL,
		isClosable: true,
		position: "top-right",
		status: "warning",
		duration: 2500,
	};

	const loseToastOptions: UseToastOptions = {
		id: "lose",
		title: LOSE_TOAST_LABEL,
		isClosable: true,
		position: "top-right",
		status: "error",
		duration: null,
	};

	const wonToastOptions: UseToastOptions = {
		id: "won",
		title: WON_TOAST_LABEL,
		isClosable: true,
		position: "top-right",
		status: "success",
		duration: null,
	};

	return { notStartedToastOptions, keyPressedToastOptions, finishedToastOptions, loseToastOptions, wonToastOptions };
};
