import { Box, Center, defineStyle, HStack, Spacer, Text } from "@chakra-ui/react";
import { HangmanValue } from "../type";

interface IHangmanValuesProps {
	hangmanValue: HangmanValue;
	sx?: object;
}

export const HangmanValues = (props: IHangmanValuesProps): JSX.Element => {
	const centerTagStyle = (hangmanValue: string | undefined): object => {
		return defineStyle({
			backgroundColor: hangmanValue !== undefined ? "brand.hangman.value" : "transparent",
		});
	};

	const spacerTagStyle = (hangmanValue: string | undefined): object => {
		return defineStyle({
			backgroundColor: hangmanValue !== undefined ? "brand.secondary.default" : "transparent",
		});
	};

	return (
		<Box w="full" h="full" sx={props.sx}>
			<HStack w="full" h="full" overflow="hidden" borderRadius="lg" borderWidth={1} spacing={0}>
				<Center w="16%" h="full" {...centerTagStyle(props.hangmanValue.head)}>
					<Text w="full" h="fit-content" variant="value">
						{props.hangmanValue.head !== undefined && props.hangmanValue.head}
					</Text>
				</Center>
				<Spacer {...spacerTagStyle(props.hangmanValue.head)} />
				<Center w="16%" h="full" {...centerTagStyle(props.hangmanValue.body)}>
					<Text w="full" h="fit-content" variant="value">
						{props.hangmanValue.body != undefined && props.hangmanValue.body}
					</Text>
				</Center>
				<Spacer {...spacerTagStyle(props.hangmanValue.body)} />
				<Center w="16%" h="full" {...centerTagStyle(props.hangmanValue.leftLeg)}>
					<Text w="full" h="fit-content" variant="value">
						{props.hangmanValue.leftLeg !== undefined && props.hangmanValue.leftLeg}
					</Text>
				</Center>
				<Spacer {...spacerTagStyle(props.hangmanValue.leftLeg)} />
				<Center w="16%" h="full" {...centerTagStyle(props.hangmanValue.rightLeg)}>
					<Text w="full" h="fit-content" variant="value">
						{props.hangmanValue.rightLeg !== undefined && props.hangmanValue.rightLeg}
					</Text>
				</Center>
				<Spacer {...spacerTagStyle(props.hangmanValue.rightLeg)} />
				<Center w="16%" h="full" {...centerTagStyle(props.hangmanValue.leftArm)}>
					<Text w="full" h="fit-content" variant="value">
						{props.hangmanValue.leftArm !== undefined && props.hangmanValue.leftArm}
					</Text>
				</Center>
				<Spacer {...spacerTagStyle(props.hangmanValue.leftArm)} />
				<Center w="16%" h="full" {...centerTagStyle(props.hangmanValue.rightArm)}>
					<Text w="full" h="fit-content" variant="value">
						{props.hangmanValue.rightArm !== undefined && props.hangmanValue.rightArm}
					</Text>
				</Center>
			</HStack>
		</Box>
	);
};
