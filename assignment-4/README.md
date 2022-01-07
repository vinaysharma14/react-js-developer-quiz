<h1 align="center">Assignment #4</h1>

## Question 📃

What is wrong with the following code?

```js
var server_echo;
var json = {
  json: JSON.stringify({
    a: 1,
    b: 2,
  }),
  delay: 3,
};
fetch('/echo/', {
  method: 'post',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
  body:
    'json=' +
    encodeURIComponent(JSON.stringify(json.json)) +
    '&delay=' +
    json.delay,
})
  .then(function (response) {
    server_echo = response.json().echo;
    return response.json();
  })
  .then(function (result) {
    alert(result);
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
server_echo.forEach(element => console.log(element));
```

## Solution 🚀

Following issues can be seen in the above code:

### #1

```js
// `json` is a vague name and doesn't help much understand it's usage
var json = {
  /**
   * likewise, `json` is vague here as well & it's ambiguous when
   * accessing `json.json` and ideally it should NOT be maintained as a
   * serialised JSON for sake of simplicity & better usage across the codebase
   */
  json: JSON.stringify({
    a: 1,
    b: 2,
  }),
  delay: 3,
};
```

### #2

```js
/**
 * `/echo/` looks like an invalid endpoint as it's missing base URL
 * ideally, it should've been something like https://api.example.com/echo
 */
fetch('/echo/', {
  method: 'post',
  headers: {
    Accept: 'application/json, text/plain, */*',
    /**
     * content-type must be `text/plain` as body is being sent
     * as a plain string, hence: 'Content-Type': 'text/plain',
     */
    'Content-Type': 'application/json',
  },
  body:
    'json=' +
    /**
     * `json.json` is already serialised, so it shouldn't be serialised
     * here again and let it be just `encodeURIComponent(json.json)`
     */
    encodeURIComponent(JSON.stringify(json.json)) +
    '&delay=' +
    json.delay,

  /**
   * alternatively, `Content-Type` could be kept as `application/json`
   * and body be sent as a serialised JSON as below:
   * `body: JSON.stringify(json)`
   *
   * note: this would need `json.json to NOT be serialised
   */
})
  .then(function (response) {
    /**
     * as response.json() is a promise NOT resolved yet,
     * accessing `echo` property would yield undefined,
     * so `server_echo` would get assigned undefined value
     */
    server_echo = response.json().echo;
    return response.json();
  })
  .then(function (result) {
    /**
     * instead `server_echo` should be assigned here
     * and that too with optional chaining just in
     * case `result` itself is undefined
     * server_echo = result?.echo;
     */
    alert(result);
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
```

## 3

```js
/**
 * optional chaining must be used with `server_echo`
 * as it could be undefined in case of API failure
 * server_echo?.forEach(element => console.log(element));
 */
server_echo.forEach(element => console.log(element));
```
