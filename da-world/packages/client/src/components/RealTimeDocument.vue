<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs>
        <textarea id="content"></textarea>
        <v-btn @click="getContent()" round color="primary" dark>Check Content</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import SimpleMDE from "simplemde";
import { Component, Vue } from 'vue-property-decorator';
import 'simplemde/dist/simplemde.min.css'

@Component
export default class RealTimeDocument extends Vue {
  private editor?: SimpleMDE;

  mounted(): void {
      const editor: SimpleMDE = new SimpleMDE({
          autoDownloadFontAwesome: false,
          element: document.getElementById('content') || undefined,
          placeholder: "type on me!",
          promptURLs: true,
          spellChecker: true,
          toolbar: false,
          toolbarTips: false
      });

      editor.codemirror.on("change", function(_updateDoc: SimpleMDE, changes: any) {
          console.log(changes);
      });

      this.editor = editor;
      this.$store.commit("documentModule/setEditor", editor);
  }

  getContent(): void {
      if (this.editor) {
          console.log(this.editor.value());
      }
      this.$store.dispatch("documentModule/fetchData", null, {root: true});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
