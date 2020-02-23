<template>
  <div class="vessel-bookmark">
    <div class="parent">
      <VesselBookmarkSummary class="child" :vesselBookmark="vesselBookmark"></VesselBookmarkSummary>
      <VoyageDetails class="child2" :id="id"></VoyageDetails>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VoyageDetails from "./VoyageDetails.vue";
import VesselBookmarkSummary from "./VesselBookmarkSummary.vue";
import { VesselBookmark as VesselBookmarkModel } from "@/api/Models/VesselBookmark";

@Component({
  components: {
    VoyageDetails,
    VesselBookmarkSummary
  }
})
export default class VesselBookmark extends Vue {
  @Prop()
  private vesselBookmark!: VesselBookmarkModel;

  get id() {
    return this.vesselBookmark.id;
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