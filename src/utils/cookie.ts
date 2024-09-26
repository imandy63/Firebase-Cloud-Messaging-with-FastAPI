import { deleteCookie, getCookie, setCookie } from "cookies-next";

class Cookies {
  static getCookieCall = (key: string) => {
    return getCookie(key);
  };

  static setCookieCall = (key: string, value: string) => {
    const d1 = new Date();
    const d2 = new Date(d1);
    d2.setMinutes(d1.getMinutes() + 30);

    return setCookie(key, value, {
      expires: new Date(d2),
    });
  };

  static clearUser = () => {
    deleteCookie("userId");
  };

  static clearToken = () => {
    deleteCookie("token");
  };
}

export default Cookies;
