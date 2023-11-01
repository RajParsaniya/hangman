export const random = <T>(list: Array<T>): T => {
	return list[Math.floor(Math.random() * list?.length)];
};

export const split = (text: string): Array<string> => {
	return text.split("");
};

export const append = <T>(list: Array<T>, ...value: T[]): Array<T> => {
	return list.concat(value);
};

export const clone = <T extends object>(value: T): T => {
	return { ...value };
};

export const replaceMessageParams = (text: string, ...params: string[]): string => {
	let message: string = text;
	params.forEach((param, index) => (message = message.replace(new RegExp(`\\{${index}\\}`, "ig"), param)));
	return message;
};
