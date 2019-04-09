<template>
  <div class='container'>
    <Uploader v-on:onPosted="onPosted"></Uploader>
    <Posts ></Posts>
  </div>
</template>
<script>
import Uploader from '../components/Uploader'
import Posts from '../components/Posts'

export default {
  components: {
    Uploader,
    Posts
  },
  methods: {
    onPosted (res) {
      console.log('---------', res)
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
