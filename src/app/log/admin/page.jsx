import Link from "next/link";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DomainAddIcon from '@mui/icons-material/DomainAdd';


export default function AdminPage() {

    return (
    <div className='flex flex-col gap-3 h-full'>
        <div className='flex flex-col h-40 shadow-lg items-center justify-center bg-white rounded-lg'>
            <h1>Welcome, Admin</h1>
        </div>
        <div className=" bg-sky-100 h-20 rounded-lg shadow-lg" >
            <span>Messages</span>
        </div>
        <div className=" bg-blue-100 h-20 roundedl-lg shadow-lg">
            Official Documents
        </div>
        <div className=" flex gap-2 items-center text-blue-500 h-auto flex-row">
        <Link className='flex flex-col items-center p-2 shadow-lg bg-sky-100 h-auto w-full rounded-lg'
                href='/log/admin/users' >
                <AccessibilityNewIcon/>
                <div>Users Management</div>
                <div></div>
        </Link>
        <div className='flex flex-col shadow-lg bg-blue-100 p-2 items-center h-auto w-full rounded-lg'>
            <DomainAddIcon/>
            <span>Department Management</span>
        </div>
        </div>
    </div>
    );
}