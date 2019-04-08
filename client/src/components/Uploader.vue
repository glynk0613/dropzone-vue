<template>
  <div class="uploader">
    <div class="dropzone" ref="dropzoneElement">
    </div>
    <Modal :show="showPreview" @close="showPreview = false">
      <div slot="header">
        <h4 class="modal-title">
          New Posts
        </h4>
      </div>
      <div slot="body" v-if="file">
        <div class="row">
          <div id="img-wrapper" class="col-sm-6">
            <img :src="file.dataURL" />
            <p class="img-info"><strong> {{ file.name }} </strong> ( {{ file.width }} x {{ file.height }} )</p>
          </div>
          <div id="content-wrapper" class="col-sm-6">
            <textarea v-model="description">
            </textarea>
            <button class="btn btn-primary" v-on:click="addPost">Post</button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Dropzone from 'dropzone'
import Modal from './Modal'
import PostsService from '@/services/PostsService'

export default {
  components: { Modal },
  data () {
    return {
      showPreview: false,
      file: null,
      description: null
    }
  },
  mounted () {
    const vm = this
    let options = {
      url: '/ffffffffffffffffff',
      method: 'put',
      parallelUploads: 5,
      acceptedFiles: '.png, .gif, .jpeg, .jpg',
      uploadMultiple: true,
      dictDefaultMessage: `<div class="media-upload-text">
          <i class="fa fa-upload"></i>
          <h4>Drag image here to upload it</h4>
        </div>`,
      header: '',
      autoProcessQueue: false,
      thumbnail (file) {
        vm.showPreview = true
        vm.file = file
      }
    }
    this.dropzone = new Dropzone(this.$refs.dropzoneElement, options)
  },
  methods: {
    // onPost () {
    //   // let formData = new FormData();
    //   // formData.append('file', this.file);


    //   // this.$emit('upload', {file: this.file, content: this.content})


    // }
    async addPost () {
      await PostsService.addPost({
        file: this.file,
        description: this.description
      })
    }
  }
}
</script>
<style lang="scss">
  .uploader {
    .dropzone {
      border: 2px solid #e6e6e6;
      border-radius: 10px;
    }
    #img-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        width: 100%;
        // max-height: 300px;
        object-fit: contain;
      }
      p {
        margin-top: 5px;
        font-size: 12px;
      }
    }
    #content-wrapper {
      textarea {
        width: 100%;
        height: 120px;
      }

    }
  }
  .dz-preview {
    display: none;
  }

</style>
