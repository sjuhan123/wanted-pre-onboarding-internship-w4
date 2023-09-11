export class HttpClientImpl {
  #baseUrl;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  fetch(endPoint: string, options?: RequestInit) {
    return window.fetch(this.#baseUrl + endPoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  }
}
