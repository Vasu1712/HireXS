import React, { useEffect, useState } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router-dom';
import { Checkbox } from '@material-tailwind/react';
import axios from 'axios';
import { makeAuthenticatedGETRequest } from '../utils/serverHelper';
import Jobid from './JobPage';

const Applicants = () => {
	const [applicants, setApplicants] = useState([]);
	const [selectedEmails, setSelectedEmails] = useState([]);
	const { jobId } = useParams();

	useEffect(() => {
		const url = `/auth/getapplicants/${jobId}`;

		async function fetchData() {
			try {
				const response = await makeAuthenticatedGETRequest(url);
				const jobDetails = response;
				const filteredApplicants = jobDetails.filter(
					(applicant) => applicant.jobId === jobId
				);
				setApplicants(filteredApplicants);
			} catch (error) {
				console.error('Error:', error);
			}
		}

		fetchData();
	}, [jobId]);

	const handleCheckboxChange = (email) => {
		if (selectedEmails.includes(email)) {
			setSelectedEmails(selectedEmails.filter(item => item !== email));
		} else {
			setSelectedEmails([...selectedEmails, email]);
		}
	};


	return (
		<LoggedInContainer curActiveScreen='home'>
			<div>
				<div className='mx-8 text-4xl font-semibold text-color6'>
					Applicants
					<div className='text-base mt-2'>
						<Link to={`/jobs/${jobId}`}>
							(Job ID: {jobId})
						</Link>
					</div>
				</div>
				<div className='m-8 italic text-lg text-color6'>
					Select the Applicants you wish to send assessment links to
				</div>
				<div>
					{applicants.length > 0 ? (
						<table className="min-w-full">
							<thead>
								<tr>
									<th className="px-4 py-3"></th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institute Name</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job ID</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
								</tr>
							</thead>
							<tbody className="text-white divide-y divide-gray-600">
								{applicants.map((applicant) => (
									<tr key={applicant._id}>
										<td className="px-4 py-4 whitespace-nowrap">
											<input
												type="checkbox"
												className="form-checkbox h-4 w-4 transition duration-150 ease-in-out bg-gray-100 border-gray-300 rounded"
												checked={selectedEmails.includes(applicant.owner.email)}
												onChange={() => handleCheckboxChange(applicant.owner.email)}
											/>
										</td>
										<td className="px-4 py-4 whitespace-nowrap">{`${applicant.owner.firstName} ${applicant.owner.lastName}`}</td>
										<td className="px-4 py-4 whitespace-nowrap">{applicant.instituteName}</td>
										<td className="px-4 py-4 whitespace-nowrap">{(applicant.score * 100).toPrecision(5)}</td>
										<td className="px-4 py-4 whitespace-nowrap">
											<a href={applicant.resume} target="_blank" rel="noopener noreferrer">
												<Icon icon="mdi:open-in-new" className="text-indigo-600 cursor-pointer" />
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className="m-8 p-2 w-2/3 h-14 flex justify-center rounded-xl bg-color1">
							<div className="mt-2 mx-12 text-white grow">No Applications!!</div>
						</div>
					)}
				</div>

			</div>
		</LoggedInContainer>
	);
};

export default Applicants;
