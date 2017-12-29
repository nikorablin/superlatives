import 'whatwg-fetch';

export default class API {
  static get(path) {
    return fetch(`/api/${path}`).then(response => response.json());
  }

  static post(path, data) {
    return fetch(`/api/${path}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    ).then(response => response.json());
  }

}
