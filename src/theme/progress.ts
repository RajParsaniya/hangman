import { defineStyle } from "@chakra-ui/react";

export const progressStyles: Record<string, object> = {
	components: {
		Progress: {
			baseStyle: defineStyle({
				track: {
					backgroundColor: "transparent",
				},
			}),
			variants: {
				score: defineStyle({
					filledTrack: {
						backgroundColor: "brand.secondary.default",
					},
				}),
			},
		},
	},
};
