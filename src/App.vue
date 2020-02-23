<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/all.min.js");

@import "./styles/index.scss";
* { 
  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $dark-charcoal;
}

.skeleton-card__text-title {
  width: 0  !important;
  height: 0 !important;
  margin-bottom: 0 !important;
}
.skeleton-card__text-container {
  padding-right: 0px !important;
}
.skeleton-card__text {
    margin-top: 6px !important;
}
</style>
