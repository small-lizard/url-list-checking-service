import { useEffect } from "react";
import { getAllJobs } from "../../services/jobsService";
import { JobsListItem } from "./JobsListItem";
import { useJobsStore } from "../../store/useJobsStore";

export function JobsList() {
    const activeJobId = useJobsStore((state) => state.activeJobId);
    const jobsList = useJobsStore((state) => state.jobsList);
    const setJobsList = useJobsStore((state) => state.setJobsList);
    const setLoadingGetAllJobs = useJobsStore((state) => state.setLoadingGetAllJobs);
    const setErrorGetAllJobs = useJobsStore((state) => state.setErrorGetAllJobs);
    const loadingGetAllJobs = useJobsStore((state) => state.loadingGetAllJobs);
    const errorGetAllJobs = useJobsStore((state) => state.errorGetAllJobs);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoadingGetAllJobs(true);
                setErrorGetAllJobs(null);

                const currentJobs = await getAllJobs();

                setJobsList(currentJobs);
            } catch (error: unknown) {
                setErrorGetAllJobs(error instanceof Error ? error.message : 'Failed to fetch jobs');
            } finally {
                setLoadingGetAllJobs(false);
            }
        };

        fetchJobs();
    }, [activeJobId, setJobsList, setLoadingGetAllJobs, setErrorGetAllJobs]);

    if (jobsList.length === 0) {
        return null;
    }

    const sortedJobs = jobsList
        .filter((job) => job.jobId !== activeJobId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="bg-gray-100 p-[30px] border border-none rounded-[20px]">
            <div className="flex flex-col bg-white px-[20px] py-[10px] rounded-[15px]">
                <table className="w-full [&_td]:py-[10px] [&_th]:py-[5px] [&_th]:text-left [&_th]:py-[15px]">
                    <thead>
                        <tr className="border-b-2 border-gray-400 text-[16px]">
                            <th className="w-[28%]">ID</th>
                            <th className="w-[15%]">Создано</th>
                            <th className="w-[10%]">Статус</th>
                            <th className="w-[8%]">Всего URL</th>
                            <th className="w-[8%]">Успешно</th>
                            <th className="w-[7%]">Ошибки</th>
                            <th className="w-[12%]"></th>
                            <th className="w-[12%]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedJobs.map((job) => {
                            return (
                                <JobsListItem key={job.jobId} job={job}></JobsListItem>
                            )
                        })}
                    </tbody>
                </table>
                {loadingGetAllJobs && <p>Loading jobs...</p>}
                {errorGetAllJobs && <p>{errorGetAllJobs}</p>}
            </div>
        </div>
    )
}