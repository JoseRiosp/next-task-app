import SideNav from "../../ui/components/SideNav";

export default function DashboardLayout({children}) {
    return (
        <section className="flex flex-row w-full">
            <SideNav className='w-80'/>
            <section>{children}</section>
        </section>
    );
}