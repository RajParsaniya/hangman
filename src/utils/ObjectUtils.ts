import { cloneDeep } from "lodash";

export class ObjectUtils {
	private constructor() {}

	public static clone<T>(obj: T): T {
		return cloneDeep(obj);
	}
}
