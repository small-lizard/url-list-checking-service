import { URLDetails } from "./UrlResultRow";

export function JobDetails(jobData: any) {
    const job = jobData.job;
    
    if(!job) {
        return <p>No job data available</p>;
    }

    const handledCount = job.urls.filter((url: any) => url.status !== 'pending').length;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
                <h3>Job Details</h3>
                <p>{handledCount} из {job.urls.length} обработано</p>
            </div>
            <ul>
                {job.urls.map((url: any, index: number) =>
                    <URLDetails url={url} index={index} key={index}></URLDetails>
                )}
            </ul>
        </div>
    )
}