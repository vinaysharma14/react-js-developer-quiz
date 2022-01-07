<h1 align="center">Assignment #4</h1>

## Question 📃

Consider the code below, please describe what you would change to improve this code.

```js
const useAuthProvide = () => {
  const [tenantId, setTenantId] = useState(
    window.localStorage.getItem('tenantId')
  );
  const [userId, setUserId] = useState(window.localStorage.getItem('userId'));
  const [accessToken, setAccessToken] = useState(
    window.localStorage.getItem('access_token')
  );
  const history = useHistory();
  const userLogin = async (
    email: string,
    password: string,
    redirectPath: string
  ) => {
    try {
      const response = await axios({
        method: 'post',
        url: `https://domain.com/api/login`,
        data: {
          email,
          password,
        },
      });
      if (response.data) {
        console.log(JSON.stringify(response.data, null, 2));
        if (response.data.type !== 'tenant') {
          alert('Unauthorized User');
        } else {
          window.localStorage.setItem('userId', response.data.userId);
          setUserId(response.data.userId);
          window.localStorage.setItem('tenantId', response.data.tenantId);
          setTenantId(response.data.tenantId);
          console.log('tenantId:' + tenantId);
          window.localStorage.setItem(
            'access_token',
            response.data.accessToken
          );
          setAccessToken(response.data.accessToken);
          history.push(redirectPath);
        }
      }
    } catch (e) {
      alert('Error Happened');
    }
  };
};
```

## Solution 🚀

Following improvements can be done in the above code:

### #1

```js
// typo should be fixed by renaming the hook to `useAuthProvider`
const useAuthProvide = () => {
  ...
};
```

### #2

```js
/**
 * a custom hook `useLocalStorage` should be written to abstract the methods for
 * getting & setting an item in the local storage and updating it's local state
 *
 * ============================ useLocalStorage.ts ============================
 *
 * const useLocalStorage = (key: string) => {
 *   const [item, seItem] = useState(localStorage.getItem(key));
 *
 *   const setItemInLocalStorage = useCallback((value: string, shouldLogValue = false) => {
 *     seItem(value)
 *     localStorage.setItem(key, value);
 *     shouldLogValue && console.log(`${key}: ${value}`)
 *   }, [key]);
 *
 *   return [item, setItemInLocalStorage];
 * }
 */

/**
 * all 3 `useState` hooks should be replaced by a much more intuitive hook
 *
 * const [userId, setUserId] = useLocalStorage('userId');
 * const [tenantId, setTenantId] = useLocalStorage('tenantId');
 * const [accessToken, setAccessToken] = useLocalStorage('access_token');
 */
const [tenantId, setTenantId] = useState(
  window.localStorage.getItem('tenantId')
);
const [userId, setUserId] = useState(window.localStorage.getItem('userId'));
const [accessToken, setAccessToken] = useState(
  window.localStorage.getItem('access_token')
);
```

### #3

```js
const history = useHistory();

/**
 * `userLogin` should be memoized with `useCallback` hook by
 * passing `history` present inside the dependency list
 *
 * const userLogin = useCallback(async (
 *   ...
 * ) => {
 *   try {
 *     ...
 *   } catch (e) {
 *     ...
 *   }
 * }, []);
 */
const userLogin = async (
  email: string,
  password: string,
  redirectPath: string
) => {
  try {
    /**
     * an instance of axios should be created in a separate file for such
     * configurations and the base URL could be stored in a `.env` file
     *
     * ============== dev.env ===============
     *
     * REACT_APP_BASE_URL = 'https://some-domain.com/api'
     *
     * ============== config.js ==============
     *
     * export const axiosInstance = axios.create({
     *   baseURL: process.env.REACT_APP_BASE_URL,
     *   timeout: 1000, // if required
     *   headers: { ... } // if required
     *   ... // and so on as per requirements
     * });
     */

    /**
     * and the axios call should be made with it's instance instead
     *
     * const response = await axiosInstance({
     *   method: 'post',
     *   url: '/login', // note that the base URL is no more required here
     *   data: { email, password },
     * });
     */

    const response = await axios({
      method: 'post',
      url: `https://domain.com/api/login`,
      data: {
        email,
        password,
      },
    });
    if (response.data) {
      console.log(JSON.stringify(response.data, null, 2));
      if (response.data.type !== 'tenant') {
        alert('Unauthorized User');
      } else {
        // ================== code from here ================== //
        window.localStorage.setItem('userId', response.data.userId);
        setUserId(response.data.userId);
        window.localStorage.setItem('tenantId', response.data.tenantId);
        setTenantId(response.data.tenantId);
        console.log('tenantId:' + tenantId);
        window.localStorage.setItem('access_token', response.data.accessToken);
        setAccessToken(response.data.accessToken);
        // ======================= to here ======================= //

        /**
         * can be reduced to just this, all thanks to `useLocalStorage`
         * hook as these methods would implicitly set the values in
         * the local storage as well as update their local states
         *
         * const { userId, tenantId, accessToken } = response.data;
         *
         * setUserId(userId);
         * setTenantId(tenantId, true); // passed `true` to log the value of `tenantId`
         * setAccessToken(accessToken);
         */

        history.push(redirectPath);
      }
    }
  } catch (e) {
    /**
     * log error message as well for better debugging
     * console.error('error in userLogin', e.message);
     */
    alert('Error Happened');
  }
};
```
