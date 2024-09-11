import { Box, Skeleton } from '@mui/material';
import React from 'react'
import Link from 'next/link';
import useEventStore from '@/app/store/eventStore';
import Image from 'next/image';

const EventCard = ({img, href, date, text, title, width }) => {
     const {loading} = useEventStore((state) => ({
        loading: state.loading
    }))
 return (
    <Box>
      {loading ? (
        <Skeleton
          variant="rectangular"
          width={300}
          height={300}
          className="rounded-lg"
        />
      ) : (
        <Link
          href={href}
          className={`h-full flex flex-col gap-2 justify-start bg-white border border-gray-200 p-3 rounded-lg text-text1 ${width}`}
        >
          <div className="h-full w-full rounded-lg relative">
            <Image
              src={img}
              alt=""
              height={9999}
              width={9999}
              className="rounded-lg relative"
              priority={true}
              style={{height: '200px', width: '100%'}}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
           <p className='text-text2 text-lg'>{title}</p>
           <div className='flex items-center gap-2'>
             <Image
              src="/svg/icons/calendar.svg"
              alt=""
              height={24}
              width={24}
              className=""
              priority={true}
            />
            <span className='text-sm'>{date}</span>
           </div>
           <p className='h-12 text-sm'>{text}</p>
          </div>
        </Link>
      )}
    </Box>
  );
}

export default EventCard;