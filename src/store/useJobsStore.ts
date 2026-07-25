// ◦ глобальное состояние (список заданий, детали, состояния загрузки/ошибок)

import { create } from "zustand/react";
import { persist } from 'zustand/middleware';

type JobsStore = {
    activeJob: string | null;
    setActiveJob: (jobId: string) => void;
};

export const useJobsStore = create<JobsStore>()(
    persist(
        (set) => ({
            activeJob: null,
            setActiveJob: (jobid: string) => {
                set({ activeJob: jobid });
            }
        }),
        {
            name: 'jobs-storage',
        }
    )
)