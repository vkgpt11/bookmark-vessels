import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action,
  MutationAction
} from "vuex-module-decorators";

import store from "@/store";
import { VesselBookmarkResponse } from "@/api/Models/VesselBookmarkResponse";
import BookmarkClient from "@/api/BookmarkClient";
import { DetailedVesselBookmark } from "@/api/Models/DetailedVasselBookmark";
import { VesselBookmark } from "@/api/Models/VesselBookmark";

@Module({
  dynamic: true,
  namespaced: true,
  name: "bookmark",
  store
})
class BookmarksModule extends VuexModule {
  public isloadingVesselDetails: boolean = false;
  public vesselBookmarks: VesselBookmarkResponse = {
    _ended_at: new Date(),
    obj_list: []
  };

  @MutationAction
  public async getBookmarks() {
    const client = new BookmarkClient(
      "https://staging-api-dq9c3pmeuk6l3sku.portcast.io/",
      "PC2F8AA637EAABD7BDDBF9F9C2E8507AAA"
    );
    const results = await (await client.getVasselBookmarks()).json();
    return {
      vesselBookmarks: results
    };
  }

  @Action
  public async getBookmarksAfter(
    dateTime: Date
  ): Promise<VesselBookmarkResponse> {
    const client = new BookmarkClient(
      "https://staging-api-dq9c3pmeuk6l3sku.portcast.io/",
      "PC2F8AA637EAABD7BDDBF9F9C2E8507AAA"
    );
    const results = await (
      await client.getVasselBookmarkAfter(dateTime)
    ).json();
    return {
      _ended_at: results._ended_at,
      obj_list: results.obj_list
    };
  }

  @Action
  public async getVoyageDetails(id: string): Promise<DetailedVesselBookmark> {
    const client = new BookmarkClient(
      "https://staging-api-dq9c3pmeuk6l3sku.portcast.io/",
      "PC2F8AA637EAABD7BDDBF9F9C2E8507AAA"
    );
    const results = await (await client.getVoyageDetails(id)).json();
    return results.obj;
  }

  @Mutation
  public changeLoading(newValue: boolean) {
    this.isloadingVesselDetails = newValue;
  }

  @Mutation
  public async addVesselBookmark(newValue: VesselBookmark[]) {
    this.vesselBookmarks.obj_list.push(...newValue);
  }

  @Mutation
  public async changeEndedAt(newValue: Date) {
    this.vesselBookmarks._ended_at = newValue;
  }

  @Mutation
  public clearBookmarks() {
    this.vesselBookmarks._ended_at = new Date();
    this.vesselBookmarks.obj_list = [];
    while (this.vesselBookmarks.obj_list.length > 0) {
      this.vesselBookmarks.obj_list.pop();
    }
  }
  
}

export default getModule(BookmarksModule);
