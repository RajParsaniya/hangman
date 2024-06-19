import { Box } from "@chakra-ui/react";
import { HangmanBodyPart } from "../type";

interface IHangmanProps {
	hangmanBodyPart: HangmanBodyPart;
	sx?: object;
}

export const Hangman = (props: IHangmanProps) => {
	return (
		<Box w="fit-content" h="fit-content" overflow="hidden" sx={props.sx}>
			<svg className="figure">
				<line x1="25%" y1="5%" x2="65%" y2="5%" />
				<line x1="65%" y1="5%" x2="65%" y2="20%" />
				<line x1="25%" y1="5%" x2="25%" y2="95%" />
				<line x1="5%" y1="95%" x2="45%" y2="95%" />

				{props.hangmanBodyPart.head && <circle r="10%" cx="65%" cy="30%" />}
				{props.hangmanBodyPart.body && <line x1="65%" y1="40%" x2="65%" y2="60%" />}

				{props.hangmanBodyPart.leftArm && <line x1="50%" y1="40%" x2="65%" y2="50%" />}
				{props.hangmanBodyPart.rightArm && <line x1="80%" y1="40%" x2="65%" y2="50%" />}

				{props.hangmanBodyPart.leftLeg && <line x1="65%" y1="60%" x2="50%" y2="70%" />}
				{props.hangmanBodyPart.rightLeg && <line x1="65%" y1="60%" x2="80%" y2="70%" />}
			</svg>
		</Box>
	);
};
