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
			alert('Logged in successfully');
			navigate('/home');
		} else {
			alert('Incorrect credentials');
		}
	};

	return (
		<div className='w-full h-full flex flex-col items-center bg-app-black text-white overflow-auto'>
			<div className='logo p-5 border-b border-solid border-gray-300 w-full flex justify-center'>
				<Link to='/home'>
					<img src={logo} alt='logo' />
				</Link>
			</div>
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
