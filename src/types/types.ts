
export type JobStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';

export type Job = {
    jobId: string;
    createdAt: string;
    status: JobStatus;
    totalUrls: number;
    successCount: number;
    errorCount: number;
    urls: URLResult[];
};

export type URLResult = {
    url: string;
    status: JobStatus;
    httpCode?: number;
    errorMessage?: string;
    duration?: number;
};