import Api from '@/services/Api'

export default {
  fetchPosts (pangeNumber) {
    return Api().get('posts/' + pangeNumber)
  },

  addPost (params) {
    console.log(params)
    let formData = new FormData()
    formData.append('file', params.file)
    formData.append('description', params.description)

    return Api().post('/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  },
  likePost (params) {
    return Api().put('like/' + params.id, params)
  },
  addPostItem (params) {
    return Api().post('posts', params)
  },

  updatePost (params) {
    return Api().put('posts/' + params.id, params)
  },

  getPost (params) {
    return Api().get('post/' + params.id)
  },

  deletePost (id) {
    return Api().delete('posts/' + id)
  }
}
