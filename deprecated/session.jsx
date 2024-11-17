/*'use server'
import { auth } from "../../auth";

export default async function getServerSession(){
    const session = await auth()
    return (
        <>
    <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
      )}


export async function getServerSideProps(){
    const session = await getServerSession(ctx);
    console.log(session)
    if (!session) {
        return {
            redirect: {
            destination: '/',
            permanent: false,
            },
        };
        }
        return {
        props: {session},
        }
  
  }*/