'use client'
import { infoBadge } from '../../scripts/infoBadge.js'

export default function DashboardPage() {
    return (
        <div className=" h-full w-full flex flex-col gap-4" >
            <div className="flex flex-row gap-5 w-ful p-4">
                {infoBadge.map((badge)=>{
                    return (
                    <div key={badge.key} className={`bg-${badge.bg} 
                    flex flex-row gap-2 mx-4 p-3 px-4 w-1/5 shadow shadow-lg
                    hover:cursor-pointer
                     rounded-lg justify-center text-sky-500 items-center`}>
                        <div className='h-auto text-sky-500'>{badge.icon}</div>
                        <div className='flex flex-col justify-center items-center
                         gap-2'>
                             <strong className='text-gray-500 
                            text-[20px]'>{badge.number}</strong>
                            <strong className='text-center
                            hidden md:block '>{badge.title}</strong>
                           
                        </div>
                    </div>)
                })}
            </div>
            <div className='w-full' >

            </div>
            <div>

            </div>
        </div>
    );
}