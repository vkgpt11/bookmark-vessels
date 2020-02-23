<template>
  <div class="target-voyage">
    <div class="parent" v-if="!loading">
      <div class="child basis30">
        <div class="label">Target Port</div>
        <div class="port">{{port}}</div>
      </div>
      <div class="child basis70">
        <div class="label">Arrival</div>
        <div :class="shouldFlag?'depart-date flag':'depart-date'">
          <span :class="shouldFlag?'indicator flag':'indicator'">{{predictedOrActual}}</span>
          {{predictedArrival}}
        </div>
        <div class="separate"></div>
        <div class="label">Carrier Provided ({{activeScac}})</div>
        <div class="carrier-provided">{{scheduledArrival}}</div>
      </div>
    </div>

    <skeleton-card
      v-if="loading"
      class="skeleton"
      :lines="2"
      :isLoading="true"
      :media="false"
      :header="false"
      :avatar="false"
      :actions="false"
    ></skeleton-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SkeletonCard from "vue-skeleton-screen";
import BookmarksModule from "@/store/modules/BookmarksModule";
import { VoyageDetail } from "@/api/Models/VoyageDetail";
import moment from "moment";

@Component({
  components: {
    SkeletonCard
  }
})
export default class TargetVoyage extends Vue {
  @Prop()
  public loading: boolean = false;
  @Prop()
  public target!: VoyageDetail;

  get activeScac() {
    return this.target.active_scac;
  }
  get port() {
    return this.target.port_name;
  }
  get predictedArrival() {
    const date = new Date(
      this.target.actual_arrival_lt
        ? this.target.actual_arrival_lt
        : this.target.predicted_arrival_lt
    );
    return moment(date).format("MMM DD hh:mm");
  }

  get predictedOrActual() {
    return this.target.actual_arrival_lt ? "A" : "P";
  }
  get scheduledArrival() {
    const date = new Date(this.target.scheduled_arrival_lt);
    return moment(date).format("MMM DD hh:mm");
  }

  get shouldFlag() {
    const scheduleDate = new Date(this.target.scheduled_arrival_lt);
    const predictedDate = new Date(this.target.predicted_arrival_lt);

    return (
      this.predictedOrActual !== "A" &&
      (scheduleDate.getMonth() !== predictedDate.getMonth() ||
        scheduleDate.getDate() !== predictedDate.getDate())
    );
  }
}
</script>

<style scoped lang="scss">
@import "../styles/index.scss";

.target-voyage {
  line-height: 1.3em;
  .parent {
    text-align: left;
    display: flex;
    .child {
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 30%;
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
        color: $green;
        display: flex;
        &.flag {
          color: $red;
        }
      }
      .separate {
        margin-top: 1em;
      }
      .carrier-provided {
        font-size: 1.1em;
      }
      .indicator {
        padding: 5px;
        font-size: 8px;
        background: $green;
        color: white;
        border-radius: $border-radius;
        font-weight: 600;
        margin-right: 1em;
        align-self: center;
        line-height: 1em;
        &.flag {
          background: $red;
        }
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