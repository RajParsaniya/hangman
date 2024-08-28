import { Box, HStack, Progress } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useCore } from "../hooks";

interface IGameScoreProps {
	word: string;
	chars: Array<string>;
	isSolved: boolean;
	sx?: object;
}

export const GameScore = (props: IGameScoreProps): JSX.Element => {
	const [score, setScore] = useState<number>(0);
	const { getProgress } = useCore();

	const progress = useMemo(() => {
		return Math.floor(getProgress(props.word, props.chars));
	}, [getProgress, props]);

	useEffect((): void => {
		if (!props.isSolved && score !== progress) {
			setScore(progress);
		}
	}, [progress, props, score]);

	return (
		<Box w="full" h="full" sx={props.sx}>
			<HStack w="full" h="full" overflow="hidden" borderRadius="lg" borderWidth={1} spacing={0}>
				<Progress w="full" h="full" variant="score" value={score} isAnimated={true}></Progress>
			</HStack>
		</Box>
	);
};
