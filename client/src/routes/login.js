import { useState } from 'react';
import logo from '../assets/images/hirexs_logo.png';
import TextInput from '../components/TextInput.js';
import PasswordInput from '../components/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverHelper';

const LoginComponent = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cookies, setCookie] = useCookies(['token']);
	const [alertMessage, setAlertMessage] = useState('');
	const [alertType, setAlertType] = useState('');
	const navigate = useNavigate();

	const login = async () => {
		const data = { email, password };
		const response = await makeUnauthenticatedPOSTRequest('/auth/login', data);
		if (response && !response.err) {
			const token = response.token;
			const date = new Date();
			date.setDate(date.getDate() + 5);
			setCookie('token', token, { path: '/', expires: date });
			setCookie('username', response.username, { path: '/', expires: date });
			setCookie('access', response.access, { path: '/', expires: date });
			setAlertType('success');
			setAlertMessage('Logged in Successfully!');
			navigate('/home');
		} else {
			setAlertType('error');
			setAlertMessage('Incorrect credentials. Please try again.');
		}
	};

	return (
		<div className='w-full h-full flex flex-col items-center bg-app-black text-white overflow-auto'>
			<div className='logo p-5 border-b border-solid border-gray-300 w-full flex justify-center'>
				<Link to='/home'>
					<img
						src={logo}
						alt='logo'
					/>
				</Link>
			</div>
			{alertMessage && (
				<div
					className={`${alertType === 'success'
						? 'bg-green-100 border-green-500'
						: 'bg-red-100 border-red-500'
						} border-t-4 rounded-b text-${alertType === 'success' ? 'green' : 'red'
						}-900 px-4 py-3 shadow-md mb-6`}
					role='alert'>
					<div className='flex'>
						<div className='py-1'>
							<svg
								className={`fill-current h-6 w-6 
								text-${alertType === 'success' ? 'green' : 'red'}-500 mr-4`}
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'>
								<path d='M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z' />
							</svg>
						</div>
						<div>
							<p className='font-bold'>{alertMessage}</p>
						</div>
					</div>
				</div>
			)}
			<div className='inputRegion w-1/3 py-10 flex items-center justify-center flex-col'>
				<div className='font-bold mb-4'>Log in to continue.</div>
				<TextInput
					label='Email address'
					placeholder='Email address'
					className='my-6'
					value={email}
					setValue={setEmail}
				/>
				<PasswordInput
					label='Password'
					placeholder='Password'
					value={password}
					setValue={setPassword}
				/>
				<div className=' w-full flex items-center justify-end my-8'>
					<button
						className='h-2/3 flex items-center justify-center rounded-full font-semibold bg-gradient-to-r from-red-400 to-pink-600 p-3 px-10 mt-6'
						onClick={(e) => {
							e.preventDefault();
							login();
						}}>
						LOG IN
					</button>
				</div>
				<div className='w-full border border-solid border-gray-300'></div>
				<div className='my-6 font-semibold text-lg'>Don't have an account?</div>
				<Link
					to='/signup'
					className='border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold'>
					<div>SIGN UP</div>
				</Link>
			</div>
		</div>
	);
};

export default LoginComponent;
