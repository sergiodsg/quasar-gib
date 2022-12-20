<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const $q = useQuasar();

const aba = ref(null);
const puerto = ref(null);

const onSubmit = () => {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted'
  })
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 1000px">
    <h5>Eliminar producto</h5>
    <q-form @submit="onSubmit" @reset="onReset">
      <div class="row q-gutter-sm justify-center">
        <q-input filled v-model="aba" label="Aba del producto" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />
      </div>

      <div class="row q-gutter-sm justify-center">
        <q-input filled v-model="puerto" label="Puerto a utilizar" lazy-rules
          :rules="[val => val && val.length > 0 || 'Campo vacío']" />
      </div>

      <div class="row q-gutter-sm justify-center">
        <q-btn label="Eliminar" type="submit" color="primary" />
      </div>
    </q-form>

  </div>
</template>
