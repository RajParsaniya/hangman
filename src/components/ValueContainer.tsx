import { Box, Center, HStack, Spacer, Text } from "@chakra-ui/react";
import { IHangmanValue } from "../interfaces";

interface IValueContainerProps {
	value: IHangmanValue;
	sx?: object;
}

export const ValueContainer = (props: IValueContainerProps) => {
	const centerTagStyle = (value: string | undefined): object => {
		return {
			backgroundColor: value !== undefined ? "brand.value.default" : "transparent",
		};
	};

	const spacerTagStyle = (value: string | undefined): object => {
		return {
			backgroundColor: value !== undefined ? "brand.secondary.default" : "transparent",
		};
	};

	return (
		<Box w="full" h="full" sx={props.sx}>
			<HStack w="full" h="full" overflow="hidden" borderRadius="lg" borderWidth={1} spacing={0}>
				<Center w="16%" h="full" {...centerTagStyle(props.value.head)}>
					<Text w="full" h="fit-content" variant="value">
						{props.value.head !== undefined && props.value.head}
					</Text>
				</Center>
				<Spacer {...spacerTagStyle(props.value.head)} />
				<Center w="16%" h="full" {...centerTagStyle(props.value.body)}>
					<Text w="full" h="fit-content" variant="value">
						{props.value.body != undefined && props.value.body}
					</Text>
				</Center>
				<Spacer {...spacerTagStyle(props.value.body)} />
				<Center w="16%" h="full" {...centerTagStyle(props.value.leftArm)}>
					<Text w="full" h="fit-content" variant="value">
						{props.value.leftArm !== undefined && props.value.leftArm}
					</Text>
				</Center>
				<Spacer {...spacerTagStyle(props.value.leftArm)} />
				<Center w="16%" h="full" {...centerTagStyle(props.value.rightArm)}>
					<Text w="full" h="fit-content" variant="value">
						{props.value.rightArm !== undefined && props.value.rightArm}
					</Text>
				</Center>
				<Spacer {...spacerTagStyle(props.value.rightArm)} />
				<Center w="16%" h="full" {...centerTagStyle(props.value.leftLeg)}>
					<Text w="full" h="fit-content" variant="value">
						{props.value.leftLeg !== undefined && props.value.leftLeg}
					</Text>
				</Center>
				<Spacer {...spacerTagStyle(props.value.leftLeg)} />
				<Center w="16%" h="full" {...centerTagStyle(props.value.rightLeg)}>
					<Text w="full" h="fit-content" variant="value">
						{props.value.rightLeg !== undefined && props.value.rightLeg}
					</Text>
				</Center>
			</HStack>
		</Box>
	);
};
