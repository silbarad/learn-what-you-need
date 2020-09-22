<template>
  <b-container>
    <b-jumbotron :fluid="true" class="text-left">
      <h1 class="display-4">Learn what you need</h1>
      <p class="lead">Welcome: {{userName}}</p>
    </b-jumbotron>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  public get userName() {
    return '';
  }
}
</script>
