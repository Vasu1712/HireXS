import LoggedInContainer from '../containers/LoggedInContainer';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import TextInput from '../components/TextInput';
import { useState, useRef, useEffect } from 'react';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';

const Jobid = () => {
	const [collegeName, setCollegeName] = useState('');
	const [collegeList, setCollegeList] = useState([]);
	const [gradePoint, setGradePoint] = useState('');
	const [resumeLink, setResumeLink] = useState('');
	const [jobData, setJobData] = useState(null);

	const navigate = useNavigate();

	const job_id = useParams().jobid;

	const [isAlertVisible, setIsAlertVisible] = useState(false);
	const [copied, setCopied] = useState(false);
	function copyToClip() {
		setIsAlertVisible(true);
		const el = document.createElement('input');
		el.value = window.location.href;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		setCopied(true);
		setTimeout(() => {
			setIsAlertVisible(false);
		}, 2000);
	}

	useEffect(() => {
		// Fetch data from the API and update the collegeList state
		axios
			.get('http://localhost:8080/institutenames/institutes')
			.then((response) => {
				setCollegeList(response.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, []);

	useEffect(() => {
		axios
			.get('http://localhost:8080/jobslist/jobs/' + job_id)
			.then((response) => {
				setJobData(response.data);
			})
			.catch((error) => {
				console.log(error);
				console.error('Error fetching job data:', error);
			});
	}, []);

	const applyPosition = async () => {
		if (!collegeName || !gradePoint || !resumeLink) {
			alert('All the fields are required. Please check again');
			return;
		}

		try {
			const data = { collegeName, gradePoint, resumeLink, jobId: job_id };

			const response = await makeAuthenticatedPOSTRequest(
				'/auth/registerjob',
				data
			);

			if (response && !response.error) {
				alert('Success');
				navigate('/jobs');
			} else {
				console.log(response.error);
				alert('Failure');
			}
		} catch (error) {
			console.error('Error applying for the position:', error);
			alert('An error occurred while applying for the position');
		}
	};

	return (
		<LoggedInContainer curActiveScreen='home'>
			<div className='flex flex-row'>
				<div className='w-3/5 h-full bg-color11 ml-10 mr-16 p-5 rounded-xl text-white'>
					<div className='flex items-center'>
						<div className='text-4xl font-semibold mt-3 tracking-wide '>
							{jobData?.jobTitle}
						</div>
					</div>
					<div className='my-3 italic text-color12'>(Job ID : {job_id})</div>
					<div>
						<div className='font-medium mt-8 text-2xl tracking-wide '>
							Job Description
						</div>
						<div className='mt-4 w-auto font-light text-color12 text-justify'>
							{jobData?.description}
						</div>
					</div>
					<div className='mt-4'>
						<div className='flex items-center justify-start mt-2 '>
							<span className='font-medium italic tracking-wide'>Role :</span>
							&nbsp; {jobData?.jobTitle}
						</div>
						<div className='flex items-center justify-start mt-2'>
							<span className='font-medium italic tracking-wide'>
								Employment Type :
							</span>
							&nbsp; {jobData?.jobType}
						</div>
					</div>
				</div>
				<div>
					<div className='h-12 bg-white rounded-2xl text-color1 px-20 font-medium text-lg flex items-center justify-center'>
						Apply
					</div>
					<div className='text-white mt-4 flex'>
						<Icon
							icon='mdi:location'
							className='pt-1 text-xl'
						/>
						<div className='pl-1'>{jobData?.location}</div>
					</div>
					<div className='text-white mt-4 flex'>
						<Icon
							icon='fa:suitcase'
							className='pt-1'
						/>
						<div className='pl-2'>{jobData?.jobType}</div>
					</div>
					<div className='text-white mt-4 flex'>
						<Icon
							icon='ri:graduation-cap-fill'
							className='pt-1 text-xl'
						/>
						<div className='pl-2'>{jobData.experience}</div>
					</div>
					<div className='text-white mt-4 flex'>
						<Icon
							icon='ic:baseline-email'
							className='pt-1 text-xl'
						/>
						<div className='pl-2'>Last Date: {format(new Date(jobData.applicationDate), 'dd MMM yyyy')}</div>
					</div>
					<div className='text-white mt-4 flex'>
						<Icon
							icon='material-symbols:share'
							className='pt-1 text-xl'
						/>
						<div className='pl-2'>
							<button onClick={copyToClip}>Share</button>
							{isAlertVisible && (
								<div className='alert-container'>
									<div className='alert-inner font-light italic'>
										Copied to Clipboard!
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className='w-3/5 h-full bg-color11 ml-10 mt-5 p-5 rounded-xl text-white'>
				<div className='w-full'>
					{/* Render the dropdown with options from the collegeList */}
					<p className='font-semibold text-lg mt-6'>Institute Name</p>
					<select
						className='my-3 w-4/6 h-12 rounded px-2'
						value={collegeName}
						onChange={(e) => setCollegeName(e.target.value)}
						style={{ color: '#838383' }}>
						<option
							value=''
							className='text-gray-800'>
							Choose your institute from the dropdown{' '}
						</option>
						{collegeList.map((college) => (
							<option
								key={college._id}
								value={college.name}>
								{college.name}
							</option>
						))}
					</select>
				</div>
				<TextInput
					label='CGPA'
					placeholder='Grade Point (Out of 10)'
					className='my-6 '
					value={gradePoint}
					setValue={setGradePoint}
					type='number'
				/>
				<TextInput
					label='Google drive link for Resume '
					placeholder='Resume URL'
					className='mt-12'
					value={resumeLink}
					setValue={setResumeLink}
					type='text'
				/>
				<p className='text-xs mt-2 italic text-color6'>
					(* Please ensure submitting the URL after enabling sharing access to
					all)
				</p>
				<button
					className='h-12 mt-12 my-6 bg-white rounded-2xl text-color1 px-20 font-medium text-lg flex items-center justify-center'
					onClick={(e) => {
						applyPosition();
					}}>
					Apply
				</button>
			</div>
		</LoggedInContainer>
	);
};

export default Jobid;
