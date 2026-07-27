import { useState } from "react";
import { cancelJob } from "../../services/jobsService";
import { useJobsStore } from "../../store/useJobsStore";
import type { Job } from "../../types/types";
import { GREEN_STATUS_JOB, RED_STATUS_JOB, YELLOW_STATUS_COMMON } from "../statusColor";

export const JobsListItem = ({ job }: { job: Job }) => {
    const setActiveJobId = useJobsStore((state) => state.setActiveJobId);
    const [isCanceling, setIsCanceling] = useState(false);
    const [cancelError, setCancelError] = useState<string | null>(null);

    const handleCancelJob = async () => {
        try {
            setIsCanceling(true);
            setCancelError(null);

            await cancelJob(job.jobId);
        } catch (error: unknown) {
            setCancelError(error instanceof Error ? error.message : 'Failed to cancel job');
        } finally {
            setIsCanceling(false);
        }
    };

    const disabledCancelButton = isCanceling || job.status === 'cancelled' || job.status === 'completed' || job.status === 'failed';

    return (
        <tr className="border-b-2 border-gray-300">
            <td>{job.jobId}</td>
            <td>{new Date(job.createdAt).toLocaleString()}</td>
            <td><span className={`px-3 py-1 rounded-full ${RED_STATUS_JOB.includes(job.status) ? 'bg-red-100 text-red-600' : GREEN_STATUS_JOB.includes(job.status) ? 'bg-green-100 text-green-600' : YELLOW_STATUS_COMMON.includes(job.status) ? 'bg-yellow-100 text-yellow-600' : ''}`}>
                {job.status}
            </span></td>
            <td>{job.totalUrls}</td>
            <td>{job.successCount}</td>
            <td>{job.errorCount}</td>
            <td><button onClick={() => setActiveJobId(job.jobId)} className="bg-green-100 py-[10px] px-[20px] rounded-[10px]  font-bold text-green-500">Сделать активной</button></td>
            <td><button onClick={handleCancelJob} disabled={disabledCancelButton}
                className="bg-red-100 py-[10px] px-[20px] rounded-[10px] font-bold text-red-500 disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed">Отменить задание</button>
                {cancelError && <p className="text-red-500">{cancelError}</p>}
            </td>
        </tr>
    )
}