import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import { format } from 'date-fns';

export function Jobcard({ JobTitle, JobId, location, JobType, Experience, LastDate }) {
  return (
    <Card className="mt-8 w-1/4 bg-black">
      <CardBody>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#EE4774"
          className="mb-4 h-12 w-12"
        >
          <path
            fillRule="evenodd"
            d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clipRule="evenodd"
          />
          <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
        </svg>
        <Typography variant="h5" color="blue-gray" className="mb-2 text-white">
          {JobTitle}
        </Typography>
        <div className='my-3 italic text-color12'>(Job ID : {JobId})</div>
        <div className='text-white mt-4 flex '>
          <Icon
            icon='mdi:location'
            className='pt-1 text-xl'
          />
          <div className='pl-1'>{location}</div>
        </div>
        <div className='text-white mt-4 flex'>
          <Icon
            icon='fa:suitcase'
            className='pt-1'
          />
          <div className='pl-2'>{JobType}</div>
        </div>
        <div className='text-white mt-4 flex'>
          <Icon
            icon='ri:graduation-cap-fill'
            className='pt-1 text-xl'
          />
          <div className='pl-2'>{Experience}</div>
        </div>
        <div className='text-white mt-4 flex'>
          <Icon
            icon='ic:baseline-email'
            className='pt-1 text-xl'
          />
          <div className='pl-2'>Expires: {format(new Date(LastDate), 'dd MMM yyyy')}</div>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <a href="/past/applicants" className="inline-block">
          <Link to={"/past/applicants"}>
            <Button size="sm" variant="text" className="flex items-center gap-2 text-white bg-color2">
              <p className="text-color14 p-1"> See Applicants </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#EE4774"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </Link>
        </a>
      </CardFooter>
    </Card>
  );
}
