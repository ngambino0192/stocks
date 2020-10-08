export const VALIDATION_FAILURE_HTTP_CODE = 422;
export const HTTP_SUCCESS = 200;
export let fetchJson = (url, opts = {}) => {
  let defaultOpts = {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Set-Cookie': `${opts.token}`,
    },
  };

  // append a special no-op query string parameter to the URL to prevent Chrome from caching the
  // JSON response for redisplay if it happens to match the same URL as an HTML page (e.g., for
  // campus search results) https://stackoverflow.com/a/16152893/1599045
  let path = url;
  // Only apply to URLs that are not signed.
  if (url.indexOf('signature=') === -1) {
    let sep = url.indexOf('?') === -1 ? '?' : '&';
    path = `${url}${sep}__is_json=1`;
  }

  return fetch(path, { ...defaultOpts, ...opts })
    .then(resp =>
      resp
        .json()
        .then(json => ({ resp, json }))
        .catch(() => ({ resp, json: null }))
    )
    .catch(() => ({ resp: null, json: null }));
};

export let postForm = (url, opts = {}) =>
  fetchJson(url, { method: 'POST', ...opts });

export let putForm = (url, opts = {}) =>
  fetchJson(url, { method: 'PUT', ...opts });
