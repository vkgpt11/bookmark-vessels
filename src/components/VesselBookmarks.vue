<template>
  <div id="main">
    <button @click="getBookmarks">Refresh</button>
    <div class="vessel-bookmarks" v-on:scroll="loadMore">
      <VesselBookmark class="item" v-for="x in bookmarks" :key="x.id" :vesselBookmark="x"></VesselBookmark>
      <skeleton-card
        v-if="isLoading"
        class="skeleton"
        :lines="3"
        :isLoading="true"
        :media="false"
        :header="false"
        :avatar="false"
        :actions="false"
        :round="true"
      ></skeleton-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VesselBookmark from "./VesselBookmark.vue";
import SkeletonCard from "vue-skeleton-screen";
import BookmarksModule from "@/store/modules/BookmarksModule";

@Component({
  components: { VesselBookmark, SkeletonCard }
})
export default class VesselBookmarks extends Vue {
  private loading: boolean = false;

  get bookmarks() {
    return BookmarksModule.vesselBookmarks.obj_list;
  }

  get isLoading() {
    return BookmarksModule.isloadingVesselDetails;
  }

  private bottomVisible(): boolean {
    const objDiv = document.getElementById("main");
    if (
      objDiv &&
      objDiv.scrollHeight - objDiv.scrollTop === objDiv.clientHeight
    ) {
      return true;
    } else {
      return false;
    }
  }

  private async loadMore() {
    const canLoadMore =
      !this.loading &&
      this.bottomVisible() &&
      BookmarksModule.vesselBookmarks._ended_at;

    if (canLoadMore) {
      this.loading = true;
      BookmarksModule.changeLoading(true);

      const result = await BookmarksModule.getBookmarksAfter(
        BookmarksModule.vesselBookmarks._ended_at
      );

      await BookmarksModule.changeEndedAt(result._ended_at);
      await BookmarksModule.addVesselBookmark(result.obj_list);
      BookmarksModule.changeLoading(false);
      this.loading = false;
    }
  }

  private async mounted() {
    await this.getBookmarks();
  }

  private async getBookmarks() {
    BookmarksModule.clearBookmarks();
    BookmarksModule.changeLoading(true);
    await BookmarksModule.getBookmarks();
    BookmarksModule.changeLoading(false);
  }
}
</script>

<style scoped lang="scss">
@import "../styles/index.scss";

.vessel-bookmarks {
  overflow: scroll;
  height: 600px; // hard coded to show the scroll bar for Skeleton
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 1em;
  border: $border-width solid $mid-dark-gray;

  .item {
    margin: 1em;
    :hover {
      background: $mid-light-gray;
    }
  }

  .skeleton {
    box-shadow: none;
    border: $border-width solid $mid-dark-gray;
    margin: 1em;
    padding: 1em 0;
    border-radius: $border-radius;
  }
}
</style>