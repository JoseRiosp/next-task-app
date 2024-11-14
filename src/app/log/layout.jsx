import SideNav from "../../ui/components/SideNav";

export default function ProfileLayout({ children }) {
  return (
    <section className="flex flex-row w-full">
      <SideNav className="w-80" />
      <section className="pt-6 m-4 container rounded-lg items-center h-screen w-screen overflow-hidden bg-blue-100">
        {children}
      </section>
    </section>
  );
}
