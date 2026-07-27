import { useEffect, useState } from "react";
import { useJobsStore } from "../store/useJobsStore";
import { getJob } from "../services/jobsService";

const FINISHED_STATUSES = ['completed', 'failed'];

export function useHandleActiveState() {
    const activeJobId = useJobsStore((state) => state.activeJobId);
    const setActiveJobData = useJobsStore((state) => state.setActiveJobData);
    const setLoadingGetJob = useJobsStore((state) => state.setLoadingGetJob);
    const setErrorGetJob = useJobsStore((state) => state.setErrorGetJob);
    const [isPolling, setIsPolling] = useState(false);

    useEffect(() => {
        const getActiveJobData = async () => {
            if (!activeJobId) {
                setActiveJobData(null);
                setIsPolling(false);
                return;
            }

            try {
                setLoadingGetJob(true);
                setErrorGetJob(null);

                const jobData = await getJob(activeJobId);
                if (!jobData) {
                    setErrorGetJob('Failed to fetch active job data');
                    return;
                }
                setActiveJobData(jobData);
                setIsPolling(true);
            } catch (error: unknown) {
                setErrorGetJob('Failed to fetch active job data');
                setActiveJobData(null);
                setIsPolling(false);
            } finally {
                setLoadingGetJob(false);
            }
        }

        getActiveJobData();
    }, [activeJobId, setActiveJobData, setLoadingGetJob, setErrorGetJob]);

    useEffect(() => {
        if (!isPolling || !activeJobId) {
            return;
        }

        const pollActiveJobData = setInterval(async () => {
            try {
                const jobData = await getJob(activeJobId);
                if (!jobData) {
                    throw new Error('Failed to fetch active job data');
                }
                setActiveJobData(jobData);

                if (FINISHED_STATUSES.includes(jobData.status)) {
                    clearInterval(pollActiveJobData);
                    setIsPolling(false);
                }
            } catch (error: unknown) {
                setErrorGetJob(error instanceof Error ? error.message : 'Failed to fetch active job data');
                setActiveJobData(null);
                setIsPolling(false);
                clearInterval(pollActiveJobData);
            }
        }, 3000);

        return () => {
            clearInterval(pollActiveJobData);
        };
    }, [isPolling, activeJobId, setActiveJobData, setErrorGetJob]);
}
