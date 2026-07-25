export async function createJob(urls: string[]) {
    const response = await fetch('http://localhost:3000/jobs', {
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

export async function getJobs() {
    const response = await fetch('http://localhost:3000/jobs', {
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
    const response = await fetch(`http://localhost:3000/jobs/${jobId}`, {
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
    const response = await fetch(`http://localhost:3000/jobs/${jobId}`, {
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

