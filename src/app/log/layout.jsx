import SideNav from "../ui/components/SideNav";

export default function Layout({children}) {
    return (
        <section>
            <SideNav/>
            {children}
        </section>
    );
}