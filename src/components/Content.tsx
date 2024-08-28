import { Box, Button, Center, HStack, Spacer, Spinner, VStack } from "@chakra-ui/react";
import { Game, GameScore, HangmanValues } from ".";
import { HINT_BUTTON, REPLAY_BUTTON, SOLVE_BUTTON, START_BUTTON } from "../constants";
import { useCore } from "../hooks";
import { HangmanValue } from "../type";

interface IContentProps {
	word?: string;
	chars: Array<string>;
	hangmanValue: HangmanValue;
	hints: number;
	isLoading: boolean;
	isStarted: boolean;
	isSolved: boolean;
	isEnded: boolean;
	onClickStart: () => void;
	onClickReplay: () => void;
	onClickHint: () => void;
	onClickSolve: () => void;
	sx?: object;
}

export const Content = (props: IContentProps): JSX.Element => {
	const { isWordGuessed } = useCore();

	return (
		<VStack w="full" h="full" spacing={0} sx={props.sx}>
			<Spacer />
			<Box w="full" h="full">
				{props.word === undefined ? (
					<Center w="full" h="full">
						<Spinner size="md" color="brand.secondary.default" />
					</Center>
				) : (
					<VStack w="full" h="full" spacing={0}>
						<Spacer />
						<HStack w="full" h="fit-content" spacing={0}>
							<Game word={props.word} chars={props.chars} sx={{ w: "full", h: "fit-content" }} />
						</HStack>
						<Spacer />
						<Box w="full" h="fit-content">
							{props.isStarted ? (
								<VStack w="full" h="fit-content" spacing={2}>
									<HStack w="full" h={8} overflow="hidden" spacing={0}>
										<HangmanValues hangmanValue={props.hangmanValue} sx={{ w: "66%", h: "full" }} />
										<Spacer />
										<Box w="28%" h="full">
											{props.isEnded ? (
												<Button
													w="full"
													h="full"
													variant="primary"
													_hover={{ opacity: 0.7 }}
													_disabled={{ opacity: 0.7, cursor: "not-allowed" }}
													isDisabled={isWordGuessed(props.word, props.chars)}
													onClick={props.onClickSolve}
												>
													{SOLVE_BUTTON}
												</Button>
											) : (
												<Button
													w="full"
													h="full"
													variant="primary"
													_hover={{ opacity: 0.7 }}
													_disabled={{ opacity: 0.7, cursor: "not-allowed" }}
													isDisabled={props.hints === 0}
													onClick={props.onClickHint}
												>
													{HINT_BUTTON}
												</Button>
											)}
										</Box>
									</HStack>
									<HStack w="full" h={8} overflow="hidden" spacing={0}>
										<GameScore word={props.word} chars={props.chars} isSolved={props.isSolved} sx={{ w: "66%", h: "full" }} />
										<Spacer />
										<Button w="28%" h="full" variant="primary" _hover={{ opacity: 0.7 }} onClick={props.onClickReplay}>
											{REPLAY_BUTTON}
										</Button>
									</HStack>
								</VStack>
							) : (
								<Button
									w="full"
									h={8}
									variant="primary"
									_hover={{ opacity: 0.7 }}
									_loading={{ opacity: 0.7 }}
									isLoading={props.isLoading}
									onClick={props.onClickStart}
								>
									{START_BUTTON}
								</Button>
							)}
						</Box>
						<Spacer />
					</VStack>
				)}
			</Box>
			<Spacer />
		</VStack>
	);
};
