import { useState } from "react";
import type { FormEvent } from "react";
import { createTask } from "../../services/jobsService";

export function NewTaskForm() {
    const [urls, setUrls] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (urls.length === 0) {
            setError('Please enter at least one URL.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await createTask(urls);

            if(!response.jobId) {
                throw new Error('Failed to create task');
            }

            localStorage.setItem('activeJob', JSON.stringify(response.jobId));

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
                rows={10}
                cols={50}
                placeholder="Enter your URLs here..."
                required
                onChange={(e) => setUrls(e.target.value.split('\n').map((url) => url.trim()).filter(Boolean))}>
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