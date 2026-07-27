import { useState } from "react";
import { createJob } from "../../services/jobsService";
import { useJobsStore } from "../../store/useJobsStore";

export function NewJobForm() {
    const setActiveJobId = useJobsStore((state) => state.setActiveJobId);
    const setLoadingCreateJob = useJobsStore((state) => state.setLoadingCreateJob);
    const setErrorCreateJob = useJobsStore((state) => state.setErrorCreateJob);
    const loadingCreateJob = useJobsStore((state) => state.loadingCreateJob);
    const errorCreateJob = useJobsStore((state) => state.errorCreateJob);
    const [urlsText, setUrlsText] = useState("");

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const urls = urlsText
            .split('\n')
            .map((url) => url.trim())
            .filter(Boolean);

        if (urls.length === 0) {
            setErrorCreateJob('Please enter at least one URL.');
            return;
        }

        try {
            setErrorCreateJob(null);
            setLoadingCreateJob(true);
            const response = await createJob(urls);

            if (!response.jobId) {
                setLoadingCreateJob(false);
                setErrorCreateJob('Failed to create job');
                return;
            }

            setActiveJobId(response.jobId);
            setUrlsText("");
        } catch (error: unknown) {
            setErrorCreateJob(error instanceof Error ? error.message : 'Failed to create job');
        } finally {
            setLoadingCreateJob(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-100 p-[30px] border border-none rounded-[20px]" >
            <label htmlFor="urls" className="font-bold text-[22px]">
                Введите URL-адреса (по одному на строку)
            </label>
            <textarea
                id="urls"
                name="urls"
                value={urlsText}
                rows={6}
                cols={50}
                className="border border-gray-500 rounded-[20px] p-[15px] bg-white"
                placeholder="Введите ваши URL-адреса здесь..."
                required
                onChange={(e) => setUrlsText(e.target.value)}>
            </textarea>
            <button
                type="submit"
                className="bg-blue-700 text-white font-bold py-[20px] rounded-[20px] hover:bg-blue-500 disabled:opacity-50 cursor-pointer text-[16px]"
                disabled={loadingCreateJob}>
                Запустить проверку
            </button>
            {errorCreateJob && <p className="text-red-500">{errorCreateJob}</p>}
        </form>
    )
}