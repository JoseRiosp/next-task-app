
//"TODO:" Only use this when middlewares is activated
export const authConfig = {
    pages: {
      signIn: '/',
    },
    callbacks: {
            authorized({ auth, request: { nextUrl } }) { //"FIXME:" auth requires a session tracking
              const isLoggedIn = !!auth?.user;
              const isOnLog = nextUrl.pathname.startsWith('/log');
              if (isOnLog){
                return isLoggedIn? true: false;
              }
              console.log('isOnLog?', isOnLog);
              console.log('isLoggedIn?', isLoggedIn)
              return isLoggedIn? true: false;
          },
        },
        providers:[],
    };