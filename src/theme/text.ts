export const textStyle = {
	components: {
		Text: {
			baseStyle: {
				userSelect: "none",
				textDecoration: "none",
				fontFamily: "Helvetica, sans-serif",
			},
			variants: {
				title: {
					fontSize: "2xl",
					color: "brand.secondary.default",
				},
				word: {
					textAlign: "center",
					fontSize: "lg",
					fontWeight: "semibold",
					borderBottomWidth: 2,
					borderColor: "brand.secondary.default",
					color: "brand.secondary.default",
				},
				value: {
					textAlign: "center",
					fontSize: "lg",
					color: "brand.secondary.default",
				},
				score: {
					fontSize: "sm",
					color: "brand.secondary.default",
				},
			},
		},
	},
};
