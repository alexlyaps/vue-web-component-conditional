<script setup>
import ConditionalLogic from "@/components/ConditionalLogic/ConditionalLogic.vue";
</script>

<template>
  <ConditionalLogic title="LOGIC" @x-click="handleFilterClicked" />
</template>

<style lang="scss">
#app {
  font-family: "Felipa", serif;
  font-style: italic;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #101828;
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
