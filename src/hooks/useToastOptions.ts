import { UseToastOptions } from "@chakra-ui/react";
import { FINISHED_TOAST, KEY_PRESSED_TOAST, LOSE_TOAST, NOT_STARTED_TOAST, WON_TOAST } from "../constants";
import { StringUtils } from "../utils";

interface IToastOptionsExports {
	getNotStartedToastOptions: UseToastOptions;
	getFinishedToastOptions: UseToastOptions;
	getLoseToastOptions: UseToastOptions;
	getWonToastOptions: UseToastOptions;
	getKeyPressedToastOptions: (key: string) => UseToastOptions;
}

export const useToastOptions = (): IToastOptionsExports => {
	const getNotStartedToastOptions: UseToastOptions = {
		id: "not-started",
		title: NOT_STARTED_TOAST,
		isClosable: true,
		position: "top-right",
		status: "warning",
		duration: 2500,
	};

	const getFinishedToastOptions: UseToastOptions = {
		id: "finished",
		title: FINISHED_TOAST,
		isClosable: true,
		position: "top-right",
		status: "warning",
		duration: 2500,
	};

	const getLoseToastOptions: UseToastOptions = {
		id: "lose",
		title: LOSE_TOAST,
		isClosable: true,
		position: "top-right",
		status: "error",
		duration: null,
	};

	const getWonToastOptions: UseToastOptions = {
		id: "won",
		title: WON_TOAST,
		isClosable: true,
		position: "top-right",
		status: "success",
		duration: null,
	};

	const getKeyPressedToastOptions = (key: string): UseToastOptions => {
		return {
			id: "key-pressed-" + key,
			title: StringUtils.replace(KEY_PRESSED_TOAST, key),
			isClosable: true,
			position: "top-right",
			status: "warning",
			duration: 2500,
		};
	};

	return { getNotStartedToastOptions, getFinishedToastOptions, getLoseToastOptions, getWonToastOptions, getKeyPressedToastOptions };
};
