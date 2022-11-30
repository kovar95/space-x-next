import Cookies from "universal-cookie";

const USER_KEY = "dbUsername";
const TTL_ONE_HOUR = 60 * 60 * 1000;

export const authenticate = (username: string) => {
  const cookies = new Cookies();
  cookies.set(USER_KEY, username, {
    path: "/",
    expires: new Date(Date.now() + TTL_ONE_HOUR),
  });
};

export const isAuth = () => {
  const cookies = new Cookies();
  const username = cookies.get(USER_KEY);

  return username;
};
