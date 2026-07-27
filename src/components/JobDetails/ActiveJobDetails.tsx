import { cancelJob } from "../../services/jobsService";
import { GREEN_STATUS_JOB, RED_STATUS_JOB, YELLOW_STATUS_COMMON } from "../statusColor";
import { useJobsStore } from "../../store/useJobsStore";
import type { URLResult } from "../../types/types";
import { URLDetails } from "./UrlResultRow";
import { useState } from "react";

export function ActiveJobDetails() {
    const activeJobData = useJobsStore((state) => state.activeJobData);
    const loadingGetJob = useJobsStore((state) => state.loadingGetJob);
    const errorGetJob = useJobsStore((state) => state.errorGetJob);

    const [isCanceling, setIsCanceling] = useState(false);
    const [cancelError, setCancelError] = useState<string | null>(null);

    if (!activeJobData) {
        return (
            <div className="flex flex-col gap-4 bg-green-100 p-[30px] border border-none rounded-[20px]">
                {loadingGetJob && <p>Loading job details...</p>}
                {errorGetJob && <p className="text-red-500">{errorGetJob}</p>}
                {!loadingGetJob && !errorGetJob && <p>No active job</p>}
            </div>
        )
    }

    const handleCancelJob = async () => {
        try {
            setIsCanceling(true);
            setCancelError(null);

            await cancelJob(activeJobData?.jobId);
        } catch (error: unknown) {
            setCancelError(error instanceof Error ? error.message : 'Failed to cancel job');
        } finally {
            setIsCanceling(false);
        }
    };

    const disabledCancelButton = isCanceling || activeJobData.status === 'cancelled' || activeJobData.status === 'completed' || activeJobData.status === 'failed';

    const handledCount = activeJobData.urls.filter((url: URLResult) => url.status !== 'pending' && url.status !== 'in_progress').length;

    return (
        <div className="bg-green-300 p-[30px] border border-none rounded-[20px]">
            <div className="flex flex-col gap-[50px] bg-white px-[20px] py-[10px] rounded-[15px]">
                <table className="w-full [&_th]:py-[5px] [&_th]:text-left">
                    <thead>
                        <tr>
                            <th className="w-[40%]">ID</th>
                            <th className="w-[15%]">Создано</th>
                            <th className="w-[10%]">Статус</th>
                            <th className="w-[8%]">Всего URL</th>
                            <th className="w-[8%]">Успешно</th>
                            <th className="w-[7%]">Ошибки</th>
                            <th className="w-[12%]">
                                <button onClick={handleCancelJob} disabled={disabledCancelButton}
                                    className="bg-red-100 py-[10px] px-[20px] rounded-[10px] font-bold text-red-500 disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed">
                                    Отменить задание
                                </button>
                                {cancelError && <p className="text-red-500">{cancelError}</p>}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{activeJobData.jobId}</td>
                            <td>{new Date(activeJobData.createdAt).toLocaleString()}</td>
                            <td><span className={`px-3 py-1 rounded-full ${RED_STATUS_JOB.includes(activeJobData.status) ? 'bg-red-100 text-red-600' : GREEN_STATUS_JOB.includes(activeJobData.status) ? 'bg-green-100 text-green-600' : YELLOW_STATUS_COMMON.includes(activeJobData.status) ? 'bg-yellow-100 text-yellow-600' : ''}`}>
                                {activeJobData.status}
                            </span></td>
                            <td>{activeJobData.totalUrls}</td>
                            <td>{activeJobData.successCount}</td>
                            <td>{activeJobData.errorCount}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex flex-col gap-[15px]">
                    <p><span className="font-bold">URLs:</span> {handledCount} из {activeJobData.urls.length} обработано</p>
                    <table className="w-full table-fixed [&_td]:py-3 [&_th]:py-3 [&_th]:text-left">
                        <thead>
                            <tr className="border-b-2 border-gray-400 text-[16px]">
                                <th className="w-[40%]">URL</th>
                                <th className="w-[15%]">Статус</th>
                                <th className="w-[15%]">HTTP Статус</th>
                                <th className="w-[15%]">Сообщение об ошибке</th>
                                <th className="w-[15%]">Время выполнения</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeJobData.urls.map((url: URLResult, index: number) =>
                                <URLDetails key={index} url={url}></URLDetails>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}