import { useEffect, useState } from "react";
import { getJob, getJobs } from "../../services/jobsService";
import { JobsListItem } from "./JobsListItem";
import { useJobsStore } from "../../store/useJobsStore";
import { JobDetails } from "../JobDetails/JobDetails";

type Job = {
    jobId: string;
    createdAt: string;
    status: string;
    urls: {
        length?: number;
        successCount?: number;
        errorCount?: number;
    } | string[];
}

export function JobsList() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [activeJobData, setActiveJobData] = useState(null);
    const activeJob = useJobsStore((state) => state.activeJob);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const nextJobs = await getJobs();
                if (nextJobs.length === 0) {
                    setJobs([]);
                    return;
                }

                setJobs(nextJobs);
            } catch (error) {
                console.error('Failed to fetch jobs');
                setJobs([]);
            }
        };

        const fetchActiveJobData = async () => {
            if (activeJob) {
                try {
                    const jobData = await getJob(activeJob);
                    if(!jobData) {
                        throw new Error('Failed to fetch active job data');
                    }
                    setActiveJobData(jobData);
                } catch (error) {
                    console.error('Failed to fetch active job data');
                    setActiveJobData(null);
                }
            } else {
                setActiveJobData(null);
            }
        };

        fetchActiveJobData();

        fetchJobs();
    }, [activeJob]);

    const sortedJobs = [...jobs].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return (
        <div>
            <h2>Jobs List</h2>
            <ul>
                {sortedJobs.map((job) => {
                    return (
                        <JobsListItem activeJobData={activeJobData} key={job.jobId} job={job}></JobsListItem>
                    )
                })}
            </ul>
        </div>
    )
}