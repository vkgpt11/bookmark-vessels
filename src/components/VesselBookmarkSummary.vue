<template>
  <div class="vessel-bookmark-summary">
    <div class="vessel">{{vesselName}}</div>
    <div class="carrier-no">{{carrierNo}}</div>
    <div class="port">{{portName}}</div>
    <div :class="shouldFlag?'date':'date flag'">{{date}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VesselBookmark } from "@/api/Models/VesselBookmark";
import moment from "moment";

@Component
export default class VesselBookmarkSummary extends Vue {
  @Prop()
  public vesselBookmark!: VesselBookmark;
  @Prop({ default: false })
  private shouldFlag!: boolean;

  get vesselName() {
    return this.vesselBookmark.vessel_name;
  }
  get carrierNo() {
    return this.vesselBookmark.carrier_no;
  }
  get portName() {
    return this.vesselBookmark.target_port_name;
  }
  get date() {
    return moment(
      this.vesselBookmark.target_port_eta,
      "YYYY-MM-DDTHH:mm"
    ).format("MMM DD");
  }
}
</script>

<style scoped lang="scss">
@import "../styles/index.scss";

.vessel-bookmark-summary {
  line-height: 1.3em;

  text-align: left;
  .vessel {
    font-weight: 600;
  }
  .carrier-no {
    font-size: 0.8em;
    color: $dark-gray;
  }
  .port {
    font-weight: 600;
    display: inline-block;
  }
  .date {
    font-weight: 600;
    margin-left: 0.5em;
    display: inline-block;
    color: $green;
    &.flag {
      color: red;
    }
  }
}
</style>