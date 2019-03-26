<template>
  <div class="home">
    <RealTimeDocument/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RealTimeDocument from '@/components/RealTimeDocument.vue';

@Component({
  components: {
      RealTimeDocument,
  },
})
export default class Home extends Vue {}
</script>
