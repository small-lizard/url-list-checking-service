const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function createJob(urls: string[]) {
    const response = await fetch(`${baseUrl}/api/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
    });

    if (!response.ok) {
        const rawBody = await response.text();
        throw new Error(JSON.parse(rawBody).message || 'Failed to create job');
    }

    const result = await response.json();

    return result;
}

export async function getAllJobs() {
    const response = await fetch(`${baseUrl}/api/jobs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const rawBody = await response.text();
        throw new Error(JSON.parse(rawBody).message || 'Failed to get job');
    }

    const result = await response.json();

    return result;
}

export async function getJob(jobId: string) {
    const response = await fetch(`${baseUrl}/api/jobs/${jobId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const rawBody = await response.text();
        throw new Error(JSON.parse(rawBody).message || 'Failed to get job');
    }

    const result = await response.json();

    return result;
}

export async function cancelJob(jobId: string) {
    const response = await fetch(`${baseUrl}/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const rawBody = await response.text();
        throw new Error(JSON.parse(rawBody).message || 'Failed to cancel job');
    }

    const result = await response.json();

    return result;
}
