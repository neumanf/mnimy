import userStore from "../stores/user.store";

interface IResponse {
    status: number;
    res: any;
}

export default class RequestHandler {
    static async make(
        path: string,
        method: string = "GET",
        body?: any
    ): Promise<IResponse> {
        const token = userStore.getAccessToken();
        const res = await fetch(`http://localhost:3001${path}`, {
            method,
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }),
            body: body ? JSON.stringify(body) : null,
        });
        const json = await res.json().catch(() => {
            return {};
        });

        return {
            status: res.status,
            res: json,
        };
    }
}
