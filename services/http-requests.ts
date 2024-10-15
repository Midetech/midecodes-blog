import axiosInstance from "./axios.config";

;

interface PostRequestParams {
    route?: string;
    payload?: FormData | unknown;
}

interface PatchRequestParams {
    route?: string;
    payload?: FormData | unknown;
}

interface DeleteRequestParams {
    route?: string;
}

export async function postMethod(params: PostRequestParams) {
    const { route, payload } = params;
    const res = await axiosInstance.post(`${route}`, payload);
    return res.data;
}

export async function patchMethod(params: PatchRequestParams) {
    const { route, payload } = params;
    const res = await axiosInstance.patch(`${route}`, payload);
    return res.data;
}

export async function putMethod(params: PatchRequestParams) {
    const { route, payload } = params;
    const res = await axiosInstance.put(`${route}`, payload);
    return res.data;
}

export async function deleteMethod(params: DeleteRequestParams) {
    const { route } = params;
    const res = await axiosInstance.delete(`${route}`);
    return res.data;
}

export const getMethod = async ({ queryKey, }: { queryKey: [string, { route: string; params: Record<string, unknown> }]; }) => {
    const { route, params } = queryKey[1];
    const { data } = await axiosInstance.get(`${route}`, {
        params,
    });
    if (data.data) {
        return data.data;
    } return data
};
