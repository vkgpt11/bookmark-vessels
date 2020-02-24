<template>
  <div class="vessel-bookmark">
    <div class="parent">
      <VesselBookmarkSummary
        class="child"
        :vesselBookmark="vesselBookmark"
        :shouldFlag="shouldFlag"
      ></VesselBookmarkSummary>
      <VoyageDetails class="child2" :id="id" @changedCarrierProvided="changedCarrierProvided"></VoyageDetails>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VoyageDetails from "./VoyageDetails.vue";
import VesselBookmarkSummary from "./VesselBookmarkSummary.vue";
import { VesselBookmark as VesselBookmarkModel } from "@/api/Models/VesselBookmark";
import moment from "moment";

@Component({
  components: {
    VoyageDetails,
    VesselBookmarkSummary
  }
})
export default class VesselBookmark extends Vue {
  @Prop()
  private vesselBookmark!: VesselBookmarkModel;
  private shouldFlag: boolean = false;
  get id() {
    return this.vesselBookmark.id;
  }

  private changedCarrierProvided(targetMonth: string, targetDate: string) {
    const etaMonth = moment(
      this.vesselBookmark.target_port_eta,
      "YYYY-MM-DDTHH:mm"
    ).format("MMM");
    const etaDate = moment(
      this.vesselBookmark.target_port_eta,
      "YYYY-MM-DDTHH:mm"
    ).format("DD");

    this.shouldFlag = targetMonth === etaMonth && targetDate === etaDate;
  }
}
</script>

<style scoped lang="scss">
@import "../styles/index.scss";

.vessel-bookmark {
  border: $border-width solid $mid-dark-gray;
  border-radius: $border-radius;
  cursor: pointer;

  .parent {
    display: flex;
    padding: 1em;
    .child {
      flex-basis: 33%;
    }
    .child2 {
      flex-basis: 67%;
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
}
</style>