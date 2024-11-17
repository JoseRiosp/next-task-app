
export const authConfig = {
    pages: {
      signIn: '/',
    },
    callbacks: {
            authorized({ auth, request: { nextUrl } }) { 
              const isLoggedIn = !!auth?.user;
              const isOnLog = nextUrl.pathname.startsWith('/log');
              if (isOnLog){
                return isLoggedIn? true: false;
              }
              return isLoggedIn? true: false;
          },
        },
        providers:[],
    };