import { useState } from "react";
import type { FormEvent } from "react";
import { createJob } from "../../services/jobsService";
import { useJobsStore } from "../../store/useJobsStore";

export function NewJobForm() {
    const setActiveJob = useJobsStore((state) => state.setActiveJob);
    const [urlsText, setUrlsText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const urls = urlsText
            .split('\n')
            .map((url) => url.trim())
            .filter(Boolean);

        if (urls.length === 0) {
            setError('Please enter at least one URL.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await createJob(urls);

            if (!response.jobId) {
                throw new Error('Failed to create job');
            }

            setActiveJob(response.jobId);
            setUrlsText("");

            setIsSubmitting(false);
            setError(null);

        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
            <label htmlFor="urls">
                Enter URLs (one per line):
            </label>
            <textarea
                id="urls"
                name="urls"
                value={urlsText}
                rows={6}
                cols={50}
                placeholder="Enter your URLs here..."
                required
                onChange={(e) => setUrlsText(e.target.value)}>
            </textarea>
            <button
                type="submit"
                disabled={isSubmitting}>
                Submit
            </button>
            {error && <p className="error">{error}</p>}
        </form>
    )
}