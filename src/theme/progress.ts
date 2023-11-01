export const progressStyles = {
	components: {
		Progress: {
			baseStyle: {
				track: {
					backgroundColor: "transparent",
				},
			},
			variants: {
				score: () => ({
					filledTrack: {
						backgroundColor: "brand.secondary.default",
					},
				}),
			},
		},
	},
};
