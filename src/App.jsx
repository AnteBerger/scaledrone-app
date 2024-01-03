import { Room } from './components/Room';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <main>
            <Room />
            <ToastContainer />
        </main>
    );
}

export default App;
