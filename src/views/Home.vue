<template>
  <div class="home">
    <VesselBookmarks/>
  </div>
</template>

<script>
// @ is an alias to /src
import VesselBookmarks from "@/components/VesselBookmarks.vue"

export default {
  name: "Home",
  components: {
    VesselBookmarks,
  },
}
</script>
