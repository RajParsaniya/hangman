import { Center, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { Content, Hangman } from ".";
import { FOOTER_TEXT, TITLE_TEXT } from "../constants";
import { useApp } from "../hooks";

export const App = () => {
	const { word, chars, value, bodyPart, hintCount, isLoading, isStarted, isEnded, onClickStart, onClickReplay, onClickHint, onClickSolve } = useApp();

	return (
		<Center w="full" minW="100vw" h="full" minH="100vh">
			<VStack w="fit-content" h="fit-content" backgroundColor="brand.primary.default" borderRadius="3xl" py={7}>
				<Text w="fit-content" h="fit-content" variant="title">
					{TITLE_TEXT}
				</Text>
				<HStack w="600px" minW="600px" maxW="600px" h="300px" minH="300px" maxH="300px" px={10}>
					<Center w="50%" h="full">
						<Hangman bodyPart={bodyPart} />
					</Center>
					<VStack w="50%" h="full">
						<Content
							word={word}
							chars={chars}
							value={value}
							hintCount={hintCount}
							isLoading={isLoading}
							isStarted={isStarted}
							isEnded={isEnded}
							onClickStart={onClickStart}
							onClickReplay={onClickReplay}
							onClickHint={onClickHint}
							onClickSolve={onClickSolve}
						/>
					</VStack>
				</HStack>
				<Link w="fit-content" h="fit-content" variant="footer" target="_blank" href="https://github.com/RajParsaniya">
					{FOOTER_TEXT}
				</Link>
			</VStack>
		</Center>
	);
};
