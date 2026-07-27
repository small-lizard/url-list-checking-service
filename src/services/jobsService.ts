export async function createJob(urls: string[]) {
    const response = await fetch('http://localhost:3000/api/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
    });

    if (!response.ok) {
        throw new Error('Failed to create job');
    }

    const result = await response.json();

    return result;
}

export async function getAllJobs() {
    const response = await fetch('http://localhost:3000/api/jobs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch jobs');
    }

    const result = await response.json();

    return result;
}

export async function getJob(jobId: string) {
    const response = await fetch(`http://localhost:3000/api/jobs/${jobId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch job');
    }

    const result = await response.json();

    return result;
}

export async function cancelJob(jobId: string) {
    const response = await fetch(`http://localhost:3000/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to cancel job');
    }

    const result = await response.json();

    return result;
}

