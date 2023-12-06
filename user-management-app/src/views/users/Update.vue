<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Update User</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input v-model="formData.username" type="text" id="username" name="username" class="mt-1 p-2 w-full border rounded-md">
      </div>

      <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
        <input v-model="formData.firstName" type="text" id="firstName" name="firstName" class="mt-1 p-2 w-full border rounded-md">
      </div>

      <div>
        <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
        <input v-model="formData.lastName" type="text" id="lastName" name="lastName" class="mt-1 p-2 w-full border rounded-md">
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../stores/User';

const router = useRouter();
const { userId } = router.currentRoute.value.params;

const { user, handleFindUser, handleUpdate } = useUserStore();

const formData = ref({
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
});

onMounted(async () => {
  await handleFindUser(userId);

    formData.value = {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
});


const submitForm = async () => {
  try {
    await handleUpdate(userId, formData.value);
    
    router.push('/');
  } catch (error) {
    console.error('Update failed:', error.message);
  }
};
</script>
