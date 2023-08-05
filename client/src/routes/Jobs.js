import LoggedInContainer from '../containers/LoggedInContainer';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Card, Typography } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const TABLE_HEAD = [
	'Company',
	'Job ID',
	'Job Title',
	'Date Posted',
	'Location',
];

const recentOpenings = [
	{
		id: '1',
		job_id: '4324',
		job_role: 'Product Manager',
		date_posted: '2022-05-17',
		location: 'Gurugram',
	},
	{
		id: '7',
		job_id: '7453',
		job_role: 'Assistant Manager',
		date_posted: '2022-05-11',
		location: 'Bengaluru',
	},
	{
		id: '2',
		job_id: '6354',
		job_role: 'Software Developer',
		date_posted: '2022-05-12',
		location: 'Hyedrabad',
	},
	{
		id: '3',
		job_id: '5824',
		job_role: 'DevOps Engineer',
		date_posted: '2022-05-10',
		location: 'Bengaluru',
	},
	{
		id: '4',
		job_id: '5434',
		job_role: 'Product Analyst',
		date_posted: '2022-05-14',
		location: 'Gurugram',
	},
	{
		id: '5',
		job_id: '7423',
		job_role: 'Project Manager',
		date_posted: '2022-05-18',
		location: 'Noida',
	},
];

const Home = () => {
	const [jobsData, setJobsData] = useState([]);
	useEffect(() => {
		axios
			.get('http://localhost:8080/jobslist/jobs')
			.then((response) => {
				setJobsData(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	return (
		<LoggedInContainer curActiveScreen='home'>
			<div>
				<div className='w-11/12 h-48 bg-color5 ml-10 mr-16 p-4 rounded-xl flex flex-col'>
					<strong className='text-color6 font-semibold text-2xl ml-4'>
						Job Search
					</strong>
					<div className='m-8 w-full flex-auto text-base '>
						<div className='relative flex flex-row'>
							<Icon
								icon='material-symbols:search'
								fontSize={20}
								className='text-gray-400 ml-12 absolute mt-4 left-3 -translate-y-1/2'
							/>
							<input
								type='text'
								placeholder='Keyword...'
								className='text-base ml-12 bg-color7 focus:outline-none active:outline-none active: text-white rounded-lg w-[20rem] h-12 pl-11 pr-4 '
							/>

							<input
								type='text'
								placeholder='Location'
								className='text-base ml-12 bg-color7 focus:outline-none active:outline-none active: text-white rounded-lg w-[20rem] h-12 pl-11 pr-4 '
							/>
							<button className='w-40 h-12 rounded-lg bg-color8 hover:bg-zinc-100 border hover:border-color8 ml-20 text-lg font-medium text-white text-zinc-50 hover:text-color8 hover:bg-white '>
								Find Job
							</button>
						</div>
					</div>
				</div>

				<div className='bg-color9 w-11/12 px-8 pt-6 pb-4 rounded-3xl flex-1 my-16 ml-8 mr-16 '>
					<strong className='text-color10 text-4xl font-bold my-8'>
						Current Openings
					</strong>
					<div className='my-10'>
						<Card className='h-full w-full text-white bg-app-black'>
							<table className='w-full min-w-max table-auto text-left overflow-auto rounded-3xl'>
								<thead>
									<tr className=''>
										{TABLE_HEAD.map((head) => (
											<th
												key={head}
												className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
												<Typography
													variant='small'
													color='blue-gray'
													className='font-normal leading-none opacity-70'>
													{head}
												</Typography>
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{jobsData.map(
										({ _id, jobTitle, jobId, location, applicationDate }) => (
											<tr
												key={_id}
												className='odd:bg-app-black even:bg-black'>
												<td className='p-4'>
													<Typography
														variant='small'
														color='blue-gray'
														className='font-normal'>
														{/* Replace this with the appropriate data from the API */}
														<img
															src='/axis.png'
															alt='Company Logo'
														/>
													</Typography>
												</td>
												<Link to={'/jobs/' + jobId}>
													<td className='p-4'>
														<Typography
															variant='small'
															color='blue'
															className='font-normal no-underline hover:underline'>
															{jobId}
														</Typography>
													</td>
												</Link>
												<td className='p-4'>
													<Typography
														variant='small'
														color='blue-gray'
														className='font-normal'>
														{jobTitle}
													</Typography>
												</td>
												<td className='p-4'>
													<Typography
														variant='small'
														color='blue-gray'
														className='font-normal'>
														{applicationDate}
													</Typography>
												</td>
												<td className='p-4'>
													<Typography
														variant='small'
														color='blue-gray'
														className='font-normal'>
														{location}
													</Typography>
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</Card>
					</div>
				</div>
			</div>
		</LoggedInContainer>
	);
};

export default Home;
