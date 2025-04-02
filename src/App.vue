<script setup>
import ConditionalLogic from "@/components/ConditionalLogic/ConditionalLogic.vue";
</script>

<template>
  <ConditionalLogic title="Filters" @x-click="handleFilterClicked" />
</template>

<style lang="scss">
#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #101828;
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
