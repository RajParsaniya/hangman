import { Box, HStack, Progress } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useGameUtils } from "../hooks";

interface IScoreProps {
	word: string;
	chars: Array<string>;
	isEnded: boolean;
	sx?: object;
}

export const Score = (props: IScoreProps) => {
	const [score, setScore] = useState<number>(0);
	const { isWordGuessed, getProgress } = useGameUtils();
	const progress = useMemo(() => Math.floor(getProgress(props.word, props.chars)), [getProgress, props.chars, props.word]);

	useEffect(() => {
		if ((!props.isEnded || isWordGuessed(props.word, props.chars)) && score !== progress) {
			setTimeout(() => {
				setScore((current) => current + 1);
			}, 10);
		}
	}, [isWordGuessed, progress, props.chars, props.isEnded, props.word, score]);

	return (
		<Box w="full" h="full" sx={props.sx}>
			<HStack w="full" h="full" overflow="hidden" borderRadius="lg" borderWidth={1} spacing={0}>
				<Progress w="full" h="full" variant="score" value={score} isAnimated></Progress>
			</HStack>
		</Box>
	);
};
