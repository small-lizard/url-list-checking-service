import type { URLResult } from "../../types/types";
import { GREEN_STATUS_URL, RED_STATUS_URL, YELLOW_STATUS_COMMON } from "../statusColor";

export const URLDetails = ({ url }: { url: URLResult }) => {
    return (
        <tr className="border-b-2 border-gray-300">
            <td className="max-w-0">
                <span className="block truncate" title={url.url}>
                    {url.url}
                </span>
            </td>
            <td><span className={`px-3 py-1 rounded-full ${RED_STATUS_URL.includes(url.status) ? 'bg-red-100 text-red-600' : GREEN_STATUS_URL.includes(url.status) ? 'bg-green-100 text-green-600' : YELLOW_STATUS_COMMON.includes(url.status) ? 'bg-yellow-100 text-yellow-600' : ''}`}>
                {url.status}
            </span></td>
            <td className={RED_STATUS_URL.includes(url.status) ? "text-red-500" : GREEN_STATUS_URL.includes(url.status) ? "text-green-500" : YELLOW_STATUS_COMMON.includes(url.status) ? "text-yellow-500" : ""}
            >{url.httpCode ?? "-"}</td>
            <td>{url.errorMessage ?? "-"}</td>
            <td>{url.duration ? (url.duration / 1000).toFixed(2) + " с" : "-"}</td>
        </tr>
    )
}