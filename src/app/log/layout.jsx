import SideNav from "../../ui/components/SideNav";

export default function ProfileLayout({children}) {
    return (
        <section className="flex flex-row w-full">
            <SideNav className='w-80'/>
            <section className="pt-6 ">{children}</section>
        </section>
    );
}