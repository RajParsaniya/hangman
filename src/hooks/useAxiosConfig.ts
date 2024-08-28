import axios from "axios";
import { useCallback, useState } from "react";
import { EMethod } from "../enums";

interface IAxoisConfigProps {
	method: EMethod;
	endpoint: string;
	request?: object;
	configOverrides?: object;
}

interface IAxiosConfigExports {
	isLoading: boolean;
	axoisConfig: (response: IAxoisConfigProps) => Promise<unknown>;
}

export const useAxiosConfig = (): IAxiosConfigExports => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const axoisConfig = useCallback((props: IAxoisConfigProps) => {
		setIsLoading(true);
		return new Promise((resolve, reject) => {
			axios
				.create()
				.request({
					method: props.method,
					url: props.endpoint,
					data: props.request,
					...props.configOverrides,
				})
				.then((response) => {
					setIsLoading(false);
					resolve(response);
				})
				.catch((error) => {
					setIsLoading(false);
					reject(error);
				});
		});
	}, []);

	return { isLoading, axoisConfig };
};
