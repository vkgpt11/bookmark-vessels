import { IFetchResponse } from "./IFetchResponse";
import { VesselBookmarkResponse } from "./Models/VesselBookmarkResponse";
import { DetailedVasselBookmarkResponse } from "./Models/DetailedVasselBookmarkResponse";

export default class BookmarkClient {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  public async getVasselBookmarks() {
    // await new Promise((r) => setTimeout(r, 1000));
    return (await fetch(`${this.baseUrl}/api/v1/scoped/eta/vessel-bookmarks`, {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.token
      },
      body: undefined
    })) as IFetchResponse<VesselBookmarkResponse>;
  }

  public async getVasselBookmarkAfter(datetime: Date) {
    // await new Promise((r) => setTimeout(r, 1000));
    return (await fetch(`${this.baseUrl}/api/v1/scoped/eta/vessel-bookmarks?_start_after=${datetime}`, {
      method: "get",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.token
      },
      body: undefined
    })) as IFetchResponse<VesselBookmarkResponse>;
  }

  public async getVoyageDetails(id: string) {
    // await new Promise((r) => setTimeout(r, 1000));
    return (await fetch(
      `${this.baseUrl}/api/v1/scoped/eta/detailed-tracking/vessel-bookmarks/${id}`,
      {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.token
        },
        body: undefined
      }
    )) as IFetchResponse<DetailedVasselBookmarkResponse>;
  }
}
