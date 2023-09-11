import { API_PATH } from "../constants/api";
import { HttpClientImpl } from "../httpClient/httpClient";

export class regionServiceImpl {
  #httpClient;

  constructor(httpClient: HttpClientImpl) {
    this.#httpClient = httpClient;
  }

  async get() {
    const response = await this.#httpClient.fetch(API_PATH.REGION);
    return response.json();
  }
}
