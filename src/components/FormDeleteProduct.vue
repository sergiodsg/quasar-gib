<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { getDocs, collection, doc, deleteDoc, runTransaction, query, where } from "firebase/firestore";
import { db } from "../firebase";

const $q = useQuasar();

const aba = ref(null);
const puerto = ref(null);

const onSubmit = () => {
  eliminarProducto();
}

const eliminarProducto = async () => {
  console.log(aba.value);
  const productosRef = collection(db, "productos");
  const q = query(productosRef, where("aba", "==", aba.value), where("puerto", "==", puerto.value));
  const querySnapshot = await getDocs(q);
  const idSelected = querySnapshot.docs.map((doc) => doc.id);
  for (let i = 0; i < idSelected.length; i++) {
    //const sfDocRef = doc(db, "productos", idSelected[i]);
    try {
      await runTransaction(db, async (transaction) => {
        //const sfDoc = await transaction.get(sfDocRef);
        // if (!sfDoc.exists()) {
        //   throw "Document does not exist!";
        // }

        await deleteDoc(doc(db, "productos", idSelected[i]));
      });
      console.log("Transaction successfully committed!");
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Se eliminó el producto exitosamente'
      })
    } catch (e) {
      console.log("Transaction failed: ", e);
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'No se pudo eliminar el producto'
      });
    }
  }
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 1000px">
    <h5>Eliminar producto</h5>
    <q-form @submit="onSubmit">
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
