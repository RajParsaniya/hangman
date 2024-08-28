export class StringUtils {
	private constructor() {}

	public static replace(str: string, ...params: string[]): string {
		let message: string = str;
		params.forEach((param, index) => (message = message.replace(new RegExp(`\\{${index}\\}`, "ig"), param)));
		return message;
	}
}
