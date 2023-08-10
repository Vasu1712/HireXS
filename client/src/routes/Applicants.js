import React, { useEffect, useState } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router-dom';
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../utils/serverHelper';

const Applicants = () => {
	const [applicants, setApplicants] = useState([]);
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

	useEffect(() => {
		const url = `/auth/gettestscore/${jobId}`;

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


	const testLink = async (email) => {
		try {
			const data = { email: email };

			const response = await makeAuthenticatedPOSTRequest(
				'/auth/testlink',
				data
			);

			if (response && !response.error) {
				alert('Email Sent!');
			} else {
				console.error(response.error);
				alert('Error sending email');
			}
		} catch (error) {
			console.error('Error sending email:', error);
			alert('An error occurred while sending the email');
		}
	}
	const interviewLink = async (email) => {
		try {
			const data = { email: email };

			const response = await makeAuthenticatedPOSTRequest(
				'/auth/interviewlink',
				data
			);

			if (response && !response.error) {
				alert('Email Sent!');
			} else {
				console.error(response.error);
				alert('Error sending email');
			}
		} catch (error) {
			console.error('Error sending email:', error);
			alert('An error occurred while sending the email');
		}
	}


	return (
		<LoggedInContainer curActiveScreen='jobs'>
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
						<div>
							<table className="min-w-full">
								<thead>
									<tr>
										<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
										<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institute Name</th>
										<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CGPA</th>
										<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume Score</th>
										<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment Score</th>
										{/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th> */}
										<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
									</tr>
								</thead>
								<tbody className="text-white divide-y divide-gray-600">
									{applicants.map((applicant) => (
										<tr key={applicant._id}>
											<td className="px-4 py-4 whitespace-nowrap">{`${applicant.owner.firstName} ${applicant.owner.lastName}`}</td>
											<td className="px-4 py-4 whitespace-nowrap">{applicant.instituteName}</td>
											<td className="px-4 py-4 whitespace-nowrap">{applicant.grade}</td>
											<td className="px-4 py-4 whitespace-nowrap">
												<span className='flex'>
													{(applicant.score * 100).toPrecision(5)}
													&nbsp;
													<button aria-label="Open Resume">
														<a href={applicant.resume} target="_blank" rel="noopener noreferrer">
															<span className="text-indigo-600 cursor-pointer" title="Open Resume">
																<Icon icon="mdi:open-in-new" />
															</span>
														</a>
													</button>
												</span>
											</td>
											<td className="px-4 py-4 whitespace-nowrap">{applicant.testScore ? applicant.testScore : "Not Attempted"}</td>
											{/* <td className="px-4 py-4 whitespace-nowrap">
												<a href={applicant.resume} target="_blank" rel="noopener noreferrer">
													<Icon icon="mdi:open-in-new" className="text-indigo-600 cursor-pointer" />
												</a>
											</td> */}
											<td>
												<button className='bg-gray-300 rounded-xl px-3 mt-4 text-black'
													onClick={(e) => {
														e.preventDefault();
														testLink(applicant.owner.email)
													}}
												>
													Test Link
												</button>
											</td>
											<td>
												<button className='border border-gray-400 rounded-xl px-3 mt-4 text-green-800'
													onClick={(e) => {
														e.preventDefault();
														interviewLink(applicant.owner.email)
													}}
												>
													Interview Mail
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
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
