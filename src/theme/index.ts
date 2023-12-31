import { extendTheme } from "@chakra-ui/react";
import { buttonStyles } from "./button";
import { colors } from "./color";
import { linkStyles } from "./link";
import { progressStyles } from "./progress";
import { textStyle } from "./text";

export default extendTheme(colors, buttonStyles, linkStyles, progressStyles, textStyle);
