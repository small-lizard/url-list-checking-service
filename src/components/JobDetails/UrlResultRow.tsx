export const URLDetails = ({url, index}: {url: any, index: number}) => {
    return (
        <li key={index} className="flex flex-row gap-4">
            <p>URL: {url.url}</p>
            <p>Status: {url.status}</p>
            {url.httpStatus && <p>HTTP Status: {url.httpStatus}</p>}
            {url.errorMessage && <p>Error Message: {url.errorMessage}</p>}
            {url.duration && <p>Duration: {(url.duration / 1000).toFixed(2)} s</p>}
        </li>
    )
}