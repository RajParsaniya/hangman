import { Box, HStack, Progress } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useGameUtils } from "../hooks";

interface IGameScoreProps {
	word: string;
	chars: Array<string>;
	isSolved: boolean;
	sx?: object;
}

export const GameScore = (props: IGameScoreProps) => {
	const [score, setScore] = useState<number>(0);
	const { getProgress } = useGameUtils();

	const progress = useMemo(() => {
		return Math.floor(getProgress(props.word, props.chars));
	}, [getProgress, props.chars, props.word]);

	useEffect(() => {
		if (!props.isSolved && score !== progress) {
			setScore(progress);
		}
	}, [progress, props.isSolved, score]);

	return (
		<Box w="full" h="full" sx={props.sx}>
			<HStack w="full" h="full" overflow="hidden" borderRadius="lg" borderWidth={1} spacing={0}>
				<Progress w="full" h="full" variant="score" value={score} isAnimated></Progress>
			</HStack>
		</Box>
	);
};
