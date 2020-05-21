// here we will put all the constants (i.e : API endpoints )
export const AUTH_API_BASE_URL = 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'; 

export const GOOGLE_AUTH_URL = AUTH_API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const SCANNER_API_BASE_URL = 'http://localhost:8081';
export const INVENTORY_CRUD_API_BASE_URL = 'http://localhost:8082';

export const MAIL_API_BASE_URL = 'http://localhost:8083';

export const RECIPES_API_BASE_URL = 'http://localhost:8084';