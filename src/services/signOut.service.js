'use server';
import { auth, signOut } from "../../auth";
import { AuthError } from "next-auth";


export async function logOutService() {
  const session = await auth();
  console.log('Login out >>', session?.user.name);
    try {
        await signOut({redirect: false});
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'SignOutError':
            return 'Failed to Log Out';
          default:
            return 'Something went wrong, try again later';
        }
      } else {
        console.log('Error in signOut request', error)
      }
      throw error;
    }
  }