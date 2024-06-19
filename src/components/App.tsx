import { Center, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { Content, Hangman } from ".";
import { FOOTER_TEXT, GITHUB_URL, TITLE_TEXT } from "../constants";
import { useApp } from "../hooks";

export const App = () => {
	const {
		word,
		chars,
		hangmanValue,
		hangmanBodyPart,
		hints,
		isLoading,
		isStarted,
		isSolved,
		isEnded,
		onClickStart,
		onClickReplay,
		onClickHint,
		onClickSolve,
	} = useApp();

	return (
		<Center w="full" minW="100vw" h="full" minH="100vh">
			<VStack w="fit-content" h="fit-content" backgroundColor="brand.primary.default" borderRadius="3xl" py={7}>
				<Text w="fit-content" h="fit-content" variant="title">
					{TITLE_TEXT}
				</Text>
				<HStack w="600px" minW="600px" maxW="600px" h="300px" minH="300px" maxH="300px" px={10}>
					<Center w="50%" h="full">
						<Hangman hangmanBodyPart={hangmanBodyPart} />
					</Center>
					<VStack w="50%" h="full">
						<Content
							word={word}
							chars={chars}
							hangmanValue={hangmanValue}
							hints={hints}
							isLoading={isLoading}
							isStarted={isStarted}
							isSolved={isSolved}
							isEnded={isEnded}
							onClickStart={onClickStart}
							onClickReplay={onClickReplay}
							onClickHint={onClickHint}
							onClickSolve={onClickSolve}
						/>
					</VStack>
				</HStack>
				<Link w="fit-content" h="fit-content" variant="footer" target="_blank" href={GITHUB_URL}>
					{FOOTER_TEXT}
				</Link>
			</VStack>
		</Center>
	);
};
