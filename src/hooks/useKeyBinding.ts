import { useEventListener } from "@chakra-ui/react";

interface IKeyBindingProps {
	onPress: (key: string) => void;
}

export const useKeyBinding = (props: IKeyBindingProps): void => {
	const keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

	useEventListener("keypress", (e) => {
		if (keys.includes(e.key)) {
			props.onPress(e.key);
		}
	});
};
