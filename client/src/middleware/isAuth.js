export const isAuth = (cookies) => {

    if (cookies.has('accessToken')) {
        return true;
    }

    return false;

}