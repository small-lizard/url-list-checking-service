import { NewJobForm } from './components/NewJobForm/NewJobForm';
import { JobsList } from './components/JobList/JobsList';

function App() {
    return (
        <div className="flex flex-col gap-20">
            <NewJobForm></NewJobForm>
            <JobsList></JobsList>
        </div>
    )
}

export default App
