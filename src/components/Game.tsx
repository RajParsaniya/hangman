import { Box, Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useGameUtils } from "../hooks";

interface IGameProps {
	word: string;
	chars: Array<string>;
	sx?: object;
}

export const Game = (props: IGameProps) => {
	const { getChars } = useGameUtils();
	const characters = useMemo((): Array<string | undefined> => getChars(props.word, props.chars), [getChars, props.chars, props.word]);

	return (
		<Box w="full" h="fit-content" sx={props.sx}>
			{characters.length > 0 && (
				<Flex w="full" h="fit-content" wrap="wrap">
					{characters.map((char, index) => {
						const key = "character-" + index;
						return (
							<Text key={key} w={4} h={7} variant="word" mr={2} mb={4}>
								{char !== undefined && char}
							</Text>
						);
					})}
				</Flex>
			)}
		</Box>
	);
};
