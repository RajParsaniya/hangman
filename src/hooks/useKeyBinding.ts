import { useEventListener } from "@chakra-ui/react";
import { useState } from "react";

interface IKeyBindingProps {
	setIsPressed?: (isPressed: boolean) => void;
}

interface IKeyBindingExports {
	key: string | undefined;
}

export const useKeyBinding = (props?: IKeyBindingProps): IKeyBindingExports => {
	const [key, setKey] = useState<string | undefined>(undefined);
	const keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

	useEventListener("keypress", (e) => {
		if (keys.includes(e.key)) {
			setKey(e.key);
			if (props !== undefined && props.setIsPressed !== undefined) {
				props.setIsPressed(true);
			}
		}
	});

	return { key };
};
