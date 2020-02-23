<template>
  <div class="voyage-details">
    <LatestVoyage class="child" :loading="isLoadingVoyageDetails" :latest="latest"></LatestVoyage>
    <TargetVoyage class="child" :loading="isLoadingVoyageDetails" :target="target"></TargetVoyage>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LatestVoyage from "./LatestVoyage.vue";
import TargetVoyage from "./TargetVoyage.vue";
import BookmarksModule from "@/store/modules/BookmarksModule";
import { VoyageDetail } from "@/api/Models/VoyageDetail";

@Component({
  components: {
    LatestVoyage,
    TargetVoyage
  }
})
export default class VoyageDetails extends Vue {
  @Prop()
  private id!: string;

  private isLoadingVoyageDetails: boolean = false;
  private listVoyageDetail: VoyageDetail[] = [];

  public async mounted() {
    this.isLoadingVoyageDetails = true;
    const result = await BookmarksModule.getVoyageDetails(this.id);
    this.listVoyageDetail = result.voyage_details;
    this.isLoadingVoyageDetails = false;
  }

  get latest() {
    const e = this.listVoyageDetail.filter((x) => x.actual_departure_lt);
    if (e && e.length > 0) {
      return e[e.length - 1];
    }
    return this.emptyVoyageDetail();
  }
  get target() {
    if (this.listVoyageDetail && this.listVoyageDetail.length > 0) {
      return this.listVoyageDetail[this.listVoyageDetail.length - 1];
    }
    return this.emptyVoyageDetail();
  }

  private emptyVoyageDetail(): VoyageDetail {
    return {
      active_scac: "",
      actual_arrival_lt: new Date(),
      actual_arrival_utc: new Date(),
      actual_departure_lt: new Date(),
      actual_departure_utc: new Date(),
      id: "",
      port_code: "",
      port_name: "",
      predicted_arrival_lt: "",
      predicted_arrival_utc: "",
      predicted_departure_lt: "",
      predicted_departure_utc: "",
      prediction_time_utc: "",
      scheduled_arrival_lt: new Date(),
      scheduled_arrival_utc: new Date(),
      scheduled_departure_lt: new Date(),
      scheduled_departure_utc: new Date()
    };
  }
}
</script>

<style scoped lang="scss">
@import "../styles/index.scss";

.voyage-details {
  display: flex;

  .child {
    flex-basis: 100%;
    padding-top: 1em;

    @include breakpoint(desktop) {
      padding-top: 0em;
    }
    @include breakpoint(tablets) {
      padding-top: 0em;
    }
  }
  @include breakpoint(mobile) {
    display: block;
  }
  @include breakpoint(tablets) {
    display: flex;
  }
  @include breakpoint(mobile-landscape) {
    display: block;
  }
}
</style>