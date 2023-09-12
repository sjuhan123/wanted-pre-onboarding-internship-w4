import { API_PATH } from "../constants/api";
import { HttpClientImpl } from "../httpClient/httpClient";

export class RegionServiceImpl {
  #httpClient;

  constructor(httpClient: HttpClientImpl) {
    this.#httpClient = httpClient;
  }

  async get() {
    const response = await this.#httpClient.fetch(API_PATH.REGION);
    return response.json();
  }
}
