<template>
  <transition name="modal">
    <div class="modal-mask" v-on:click="close" v-show="show">
      <div class="modal-container" v-on:click.stop>
        <header class="modal-header">
          <slot name="header">
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: ['show'],
    methods: {
      close: function () {
        this.$emit('close')
      }
    },
    mounted: function () {
      document.addEventListener('keydown', (e) => {
        if (this.show && e.keyCode === 27) {
          this.close()
        }
      })
    }
  }
</script>
<style lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: table;
    transition: opacity .3s ease;
  }
  .modal-container {
    width: 50%;
    margin: 50px auto;
    padding: 10px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all .3s ease;
  }
</style>