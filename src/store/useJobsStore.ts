import { create } from "zustand/react";
import { persist } from 'zustand/middleware';
import type { Job } from "../types/types";

type JobsStore = {
    activeJobId: string | null;
    activeJobData: Job | null;
    jobsList: Job[] | [];
    setActiveJobData: (jobData: Job | null) => void;
    setActiveJobId: (jobId: string | null) => void;
    setJobsList: (jobsList: Job[]) => void;

    loadingCreateJob: boolean;
    loadingGetJob: boolean;
    loadingGetAllJobs: boolean;

    errorCreateJob: string | null;
    errorGetJob: string | null;
    errorGetAllJobs: string | null;

    setLoadingCreateJob: (loading: boolean) => void;
    setLoadingGetJob: (loading: boolean) => void;
    setLoadingGetAllJobs: (loading: boolean) => void;

    setErrorCreateJob: (error: string | null) => void;
    setErrorGetJob: (error: string | null) => void;
    setErrorGetAllJobs: (error: string | null) => void;
};

export const useJobsStore = create<JobsStore>()(
    persist(
        (set) => ({
            activeJobId: null,
            setActiveJobId: (jobId: string | null) => {
                set({ activeJobId: jobId });
            },
            activeJobData: null,
            setActiveJobData: (jobData: Job | null) => {
                set({ activeJobData: jobData });
            },
            jobsList: [],
            setJobsList: (jobsList: Job[]) => {
                set({ jobsList });
            },
            loadingCreateJob: false,
            loadingGetJob: false,
            loadingGetAllJobs: false,

            errorCreateJob: null,
            errorGetJob: null,
            errorGetAllJobs: null,

            setLoadingCreateJob: (loading: boolean) => {
                set({ loadingCreateJob: loading });
            },
            setLoadingGetJob: (loading: boolean) => {
                set({ loadingGetJob: loading });
            },
            setLoadingGetAllJobs: (loading: boolean) => {
                set({ loadingGetAllJobs: loading });
            },

            setErrorCreateJob: (error: string | null) => {
                set({ errorCreateJob: error });
            },
            setErrorGetJob: (error: string | null) => {
                set({ errorGetJob: error });
            },
            setErrorGetAllJobs: (error: string | null) => {
                set({ errorGetAllJobs: error });
            },
        }),
        {
            name: 'jobs-storage',
            partialize: (state) => ({
                activeJobId: state.activeJobId,
                activeJobData: state.activeJobData,
                jobsList: state.jobsList,
            }),
        }
    )
)