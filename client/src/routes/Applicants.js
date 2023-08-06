import React, { useEffect, useState } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router-dom';
import { Checkbox } from '@material-tailwind/react';
import axios from 'axios';

const Applicants = () => {
	const [applicants, setApplicants] = useState([]);
	const { jobId } = useParams();

	useEffect(() => {
		axios
			.get(`/api/jobs/${jobId}`)
			.then((response) => {
				const jobDetails = response.data;
				axios
					.get('http://localhost:8080/auth/cvanalysis')
					.then((response) => {
						const data = response.data;
						const filteredApplicants = data.filter(
							(applicant) => applicant.description === jobDetails.description
						);
						setApplicants(filteredApplicants);
					})
					.catch((error) => {
						console.error('Error fetching data:', error);
					});
			})
			.catch((error) => {
				console.error('Error fetching job details:', error);
			});
	}, [jobId]);

	return (
		<LoggedInContainer curActiveScreen='home'>
			<div>
				<div className='mx-8 text-4xl font-semibold text-color6'>
					Applicants
				</div>
				<div className='m-8 italic text-lg text-color6'>
					Select the Applicants you wish to send assessment links to
				</div>
				<div>
					{/* Conditionally render the list or default applicant */}
					{applicants.length > 0 ? (
						applicants.map((applicant) => (
							<div
								key={applicant._id}
								className='m-8 p-2 w-2/3 flex justify-between rounded-xl bg-color1'>
								<Checkbox
									color='#EE4774'
									ripple={true}
								/>
								<div className='mt-3 mx-12 text-white grow'>
									{applicant.owner.username}
								</div>
								<div className='mt-3 mx-12 text-white flex-none'>
									{applicant.grade}
								</div>
							</div>
						))
					) : (
						// Display the default applicant when the list is empty
						<div className='m-8 p-2 w-2/3 flex justify-between rounded-xl bg-color1'>
							<Checkbox
								color='#EE4774'
								ripple={true}
							/>
							<div className='mt-3 mx-12 text-white grow'>Sandeep Kumar</div>
							<div className='mt-3 mx-12 text-white flex-none'>8.5</div>
						</div>
					)}
				</div>
			</div>
		</LoggedInContainer>
	);
};

export default Applicants;
