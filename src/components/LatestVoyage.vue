<template>
  <div class="latest-voyage">
    <div class="parent" v-if="!isLoading">
      <div class="child basis30">
        <div class="label">{{constants.latestPort}}</div>
        <div class="port">{{port}}</div>
      </div>
      <div class="child basis70">
        <div class="label">{{constants.departure}}</div>
        <div class="depart-date">{{actualDepart}}</div>
        <div class="separate"></div>
        <div class="label">{{constants.carrierProvided}} ({{activeScac}})</div>
        <div class="carrier-provided">{{scheduledDepart}}</div>
      </div>
    </div>

    <skeleton-card
      v-if="isLoading"
      class="skeleton"
      :lines="2"
      :isLoading="true"
      :media="false"
      :header="false"
      :avatar="false"
      :actions="false"
      :round = "true"
    ></skeleton-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SkeletonCard from "vue-skeleton-screen";
import BookmarksModule from "@/store/modules/BookmarksModule";
import { VoyageDetail } from "../api/Models/VoyageDetail";
import moment from "moment";
import * as constants from "@/helper/constants";

@Component({
  components: {
    SkeletonCard
  }
})
export default class LatestVoyage extends Vue {
  @Prop()
  public isLoading: boolean = false;
  
  @Prop()
  public latest!: VoyageDetail;

  get constants(){
    return  constants;
  }

  get activeScac() {
    return this.latest.active_scac;
  }
  get port() {
    return this.latest.port_name;
  }
  get actualDepart() {
    return moment(this.latest.actual_departure_lt).format("MMM DD hh:mm");
  }
  get scheduledDepart() {
    return moment(this.latest.scheduled_departure_lt).format("MMM DD hh:mm");
  }
}
</script>

<style scoped lang="scss">
@import "../styles/index.scss";

.latest-voyage {
  line-height: 1.3em;
  .parent {
    text-align: left;
    display: flex;
    .child {
      flex-grow: 0;
      flex-shrink: 0;
      &.basis30 {
        flex-basis: 30%;
      }
      &.basis70 {
        flex-basis: 70%;
      }
      .label {
        font-size: 0.8em;
        color: $dark-gray;
      }
      .port {
        font-weight: 600;
      }
      .depart-date {
        font-size: 1.5em;
      }
      .separate {
        margin-top: 1em;
      }
      .carrier-provided {
        font-size: 1.1em;
      }
    }
  }

  .skeleton {
    box-shadow: none;
    margin: 0;
    padding: 0;
  }
}
</style>