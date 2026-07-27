import { NewJobForm } from './components/NewJobForm/NewJobForm';
import { JobsList } from './components/JobList/JobsList';
import { ActiveJobDetails } from './components/JobDetails/ActiveJobDetails';
import { useHandleActiveState } from './utils/useHandleActiveState';

function App() {
    useHandleActiveState();

    return (
        <div className="flex flex-col gap-[30px]">
            <NewJobForm></NewJobForm>
            <ActiveJobDetails></ActiveJobDetails>
            <JobsList></JobsList>
        </div>
    )
}

export default App;
