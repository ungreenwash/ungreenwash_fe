import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import { getURL } from '../../apis/routes';

const axios = setupCache(Axios);

export function apiGetBaseQAs(question: string, companies: string[], summarize: boolean) {
    var ret: any = []
    if (companies.length === 0 || question === "") {
        return ret;
    }

    try {
        const response = axios.post(getURL('/api/query/batch'), {
            companies: companies,
            questions: [question],
            summarize: summarize
        });
        return response
    } catch (error) {
        console.error(error);
    }
}