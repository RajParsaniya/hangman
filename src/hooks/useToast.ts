import { CreateToastFnReturn, ToastId, UseToastOptions, useToast as useChakraToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface IToastExports {
	isActive: (id: ToastId) => boolean;
	close: (id: ToastId) => void;
	closeAll: () => void;
	toast: (toastOptions: UseToastOptions) => void;
}

export const useToast = (): IToastExports => {
	const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
	const [toastOptions, setToastOptions] = useState<UseToastOptions | undefined>(undefined);
	const customToast: CreateToastFnReturn = useChakraToast();
	
	const isActive = (id: ToastId): boolean => {
		return customToast.isActive(id);
	};

	const close = (id: ToastId): void => {
		customToast.close(id);
	};

	const closeAll = (): void => {
		customToast.closeAll();
	};

	const toast = (props: UseToastOptions): void => {
		if (props.id !== undefined && isActive(props.id)) {
			close(props.id);
		}
		setToastOptions(props);
		setIsDisplayed(true);
	};

	useEffect(() => {
		if (isDisplayed && toastOptions !== undefined) {
			setIsDisplayed(false);
			customToast(toastOptions);
		}
	}, [customToast, isDisplayed, toastOptions]);

	return { isActive, close, closeAll, toast };
};
