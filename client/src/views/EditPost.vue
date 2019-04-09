<template>
  <div class="posts row justify-content-md-center">
    <div class="title">
      <h1>Edit Post</h1>
    </div>
    <div class="content">
      <div>
        <img :src="url ? baseUrl + url : blankUrl">
      </div>
      <div class="description-wrapper">
        <textarea rows="5" placeholder="DESCRIPTION" v-model="description"></textarea>
      </div>
      <div>
        <button class="btn btn-primary" @click="updatePost">Update</button>
        <button class="btn btn-danger" @click="deletePost">Delete</button>
        <button class="btn btn-success" @click="backHome">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'EditPost',
  data () {
    return {
      url: '',
      description: '',
      baseUrl: process.env.API_URL || 'http://localhost:8081/',
      blankUrl: 'data:image/jpeg;base64,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'
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      })
      this.url = response.data.url
      this.description = response.data.description
    },
    async updatePost () {
      await PostsService.updatePost({
        id: this.$route.params.id,
        description: this.description
      })
      this.backHome()
    },
    async deletePost () {
      await PostsService.deletePost(this.$route.params.id)
      this.backHome()
    },
    backHome () {
      this.$router.push({ name: 'Home' })
    }

  }
}
</script>
<style lang="scss" scoped>
 img {
  max-width: 100%;
  max-height: 300px;
}
.description-wrapper {
  textarea {
    margin-top: 10px;
    width: 100%;
  }
}
.title, .contnet {
  width: 100%;
}
</style>
