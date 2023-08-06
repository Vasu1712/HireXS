import './output.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeComponent from './routes/HomeComponent';
import LoginComponent from './routes/login';
import SignupComponent from './routes/Signup';
import LoggedInHome from './routes/LoggedInHome.js';
import Jobs from './routes/Jobs';
import JobPage from './routes/JobPage';
import Contact from './routes/Contact';
import HRjobs from './routes/HRJobs';
import Applicants from './routes/Applicants';
import About from './routes/About';
import { useCookies } from 'react-cookie';

function App() {
	const [cookie, setCookie] = useCookies(['token']);

	return (
		<div className='w-screen h-screen font-poppins '>
			<BrowserRouter>
				{cookie.token && cookie.token !== undefined ? (
					<Routes>
						<Route
							path='/jobs'
							element={cookie.access === 'admin' ? (<HRjobs />) : <Jobs />}
						/>
						<Route
							path='/jobs/:jobid'
							element=<JobPage />
						/>
						<Route
							path='/home'
							element=<LoggedInHome />
						/>
						<Route
							path='/past'
							element=<HRjobs />
						/>
						<Route
							path='/past/applicants/:jobId'
							element=<Applicants />
						/>
						<Route
							path='/about'
							element=<About />
						/>
						<Route
							path='/help'
							element=<Contact />
						/>
						<Route
							path='*'
							element=<LoggedInHome />
						/>
					</Routes>
				) : (
					<Routes>
						<Route
							path='/jobs'
							element=<Jobs />
						/>
						<Route
							path='/home'
							element=<HomeComponent />
						/>
						<Route
							path='/login'
							element=<LoginComponent />
						/>
						<Route
							path='/signup'
							element=<SignupComponent />
						/>
						<Route
							path='*'
							element=<Navigate to='/home' />
						/>
					</Routes>
				)}
			</BrowserRouter>
		</div>
	);
}

export default App;
