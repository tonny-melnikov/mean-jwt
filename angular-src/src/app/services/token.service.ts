export function jwtOptionsFactory() {
    return {
      tokenGetter: () => {
        return localStorage.getItem('token');
      },
      whitelistedDomains: ['localhost:8080', 'localhost:4200', 'mean-jwt-app.herokuapp.com']
    };
  }
