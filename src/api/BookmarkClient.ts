import { IFetchResponse } from "./IFetchResponse";
import { VesselBookmarkResponse } from "./Models/VesselBookmarkResponse";
import { DetailedVasselBookmarkResponse } from "./Models/DetailedVasselBookmarkResponse";
import * as constants from "@/helper/constants";

export default class BookmarkClient {
  private readonly baseUrl: string;
  private readonly token: string;
 
  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  public async getVasselBookmarks() {
    // ToDo: Remove timer 
    // show skeleton effect
    // await new Promise((r) => setTimeout(r, 500));
    return (await fetch(`${this.baseUrl}${constants.allBookmarksUrl}`, {
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
    // ToDo: Remove timer 
    // show skeleton effect
    await new Promise((r) => setTimeout(r, 500));  
    return (await fetch(`${this.baseUrl}${constants.nextBookmarksUrl}${datetime}`, {
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
    // ToDo: Remove timer 
    // show skeleton effect
    await new Promise((r) => setTimeout(r, 500));
    return (await fetch(
      `${this.baseUrl}${constants.aDetailedBookmarkUrl}${id}`,
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
