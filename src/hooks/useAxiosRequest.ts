import { useCallback, useEffect, useState } from "react";
import { useAxiosConfig } from ".";
import { Method } from "../type";

interface IAxiosRequestProps<ResponseType> {
	method: Method;
	endpoint: string;
	request?: object;
	configOverrides?: object;
	onSuccess: (response: ResponseType) => void;
	onFailure?: () => void;
}

interface IAxiosRequestExports {
	isLoading: boolean;
	forceReload: () => void;
}

export const useAxiosRequest = <ResponseType>(props: IAxiosRequestProps<ResponseType>): IAxiosRequestExports => {
	const [reload, setReload] = useState<boolean>(false);
	const { isLoading, axoisConfig } = useAxiosConfig();

	useEffect(() => {
		if (reload) {
			setReload(false);
			axoisConfig({ method: props.method, endpoint: props.endpoint, request: props.request, configOverrides: props.configOverrides })
				.then((response) => {
					if (props.onSuccess) {
						props.onSuccess(response as ResponseType);
					}
				})
				.catch(() => {
					if (props.onFailure) {
						props.onFailure();
					}
				});
		}
	}, [axoisConfig, props, reload]);

	const forceReload = useCallback((): void => {
		setReload(true);
	}, []);

	return { isLoading, forceReload };
};
