import { cancelJob } from "../../services/jobsService";
import { JobDetails } from "../JobDetails/JobDetails";
import { useJobsStore } from "../../store/useJobsStore";

export const JobsListItem = ({ job, activeJobData }: { job: any, activeJobData: any }) => {
    const activeJob = useJobsStore((state) => state.activeJob);

    const isActiveJob = activeJob === job.jobId;

    return (
        <div className="flex flex-col gap-2">
            <li className={`flex flex-row gap-4 ${isActiveJob ? 'bg-green-200' : 'bg-gray-200'}`}>
                <p>Job ID: {job.jobId}</p>
                <p>Created At: {job.createdAt}</p>
                <p>Status: {job.status}</p>
                <p>Total URLs: {job.totalUrls}</p>
                <p>Success Count: {job.successCount}</p>
                <p>Error Count: {job.errorCount}</p>
            </li>
            {isActiveJob && (
                <JobDetails job={activeJobData}></JobDetails>
            )}
        </div>
    )
}