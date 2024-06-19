export class ArrayUtils {
	private constructor() {}

	public static append<T>(list: Array<T>, ...items: T[]): Array<T> {
		return list.concat(items);
	}

	public static random<T>(list: Array<T>): T {
		return list[Math.floor(Math.random() * list.length)];
	}
}
