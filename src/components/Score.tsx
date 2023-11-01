import { Box, HStack, Progress } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useGameUtils } from "../hooks";

interface IScoreProps {
	word: string;
	chars: Array<string>;
	sx?: object;
}

export const Score = (props: IScoreProps) => {
	const [lastAnimatedProgress, setLastAnimatedProgress] = useState<number>(0);

	const { getProgress } = useGameUtils();
	const progress = useMemo(() => Math.floor(getProgress(props.word, props.chars)), [getProgress, props.chars, props.word]);

	useEffect(() => {
		if (lastAnimatedProgress !== progress) {
			setTimeout(() => {
				setLastAnimatedProgress((current) => current + 1);
			}, 10);
		}
	}, [lastAnimatedProgress, progress]);

	return (
		<Box w="full" h="full" sx={props.sx}>
			<HStack w="full" h="full" overflow="hidden" borderRadius="lg" borderWidth={1} spacing={0}>
				<Progress w="full" h="full" variant="score" value={lastAnimatedProgress} isAnimated></Progress>
			</HStack>
		</Box>
	);
};
