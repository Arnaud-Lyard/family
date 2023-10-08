<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header"> Default Header </slot>
        </header>

        <main class="modal-body" id="modalDescription">
          <slot name="body"> Default body content </slot>
        </main>

        <footer class="modal-footer">
          <button type="button" class="btn-open-modal button" @click="$emit('confirm')" aria-label="Save">
            <slot name="buttonOne"> Save </slot>
          </button>
          <button type="button" class="btn-open-modal button-grey" @click="$emit('close')" aria-label="Close">
            <slot name="buttonTwo"> Close </slot>
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
const emit = defineEmits(['close', 'confirm'])


</script>