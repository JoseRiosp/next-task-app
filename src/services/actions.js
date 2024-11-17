'use server';
import { signIn } from "../../auth";
import { AuthError } from "next-auth";

export async function authenticate(formData) {
    try {
        await signIn('credentials', {...formData, redirectTo:'/log'}); //"TODO:" set Redirect to false if Middleware is activated!
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid username or password';
          default:
            return 'Something went wrong, try again later';
        }
      }
      throw error;
    }
  }