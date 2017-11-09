<template>
  <div class="link">
      <a :href="link.url">{{link.description}}</a>
  </div>
</template>

<script lang="ts" src="./c-link.ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
