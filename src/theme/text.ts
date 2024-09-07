import { defineStyle } from "@chakra-ui/react";

export const textStyle: Record<string, object> = {
	components: {
		Text: {
			baseStyle: defineStyle({
				userSelect: "none",
				textDecoration: "none",
				fontFamily: "Helvetica, sans-serif",
			}),
			variants: {
				title: defineStyle({
					fontSize: "2xl",
					color: "brand.secondary.default",
				}),
				word: defineStyle({
					textAlign: "center",
					fontSize: "lg",
					fontWeight: "semibold",
					borderBottomWidth: 2,
					borderColor: "brand.secondary.default",
					color: "brand.secondary.default",
				}),
				value: defineStyle({
					textAlign: "center",
					fontSize: "lg",
					color: "brand.secondary.default",
				}),
				score: defineStyle({
					fontSize: "sm",
					color: "brand.secondary.default",
				}),
			},
		},
	},
};
