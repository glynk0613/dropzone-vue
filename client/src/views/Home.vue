<template>
  <div class='container'>
    <Uploader v-on:upload="uploadFile"></Uploader>
  </div>
</template>
<script>
import Uploader from '../components/Uploader'

export default {
  components: {
    Uploader
  },
  methods: {
    uploadFile (data) {
      console.log(data)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
