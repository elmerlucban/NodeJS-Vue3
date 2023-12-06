<template>
    <div id="app" class="container mx-auto p-4">
      <div class="lg:w-2/3 mx-auto">
        <router-link to="/create" class="text-blue-500 hover:underline mb-4">Create New User</router-link>

        <h2 class="text-2xl font-bold mb-4">User List</h2>
  
        <!-- Table -->
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                {{ user.username }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ user.firstName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ user.lastName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button @click="updateUser(user._id)" class="text-blue-500 hover:underline mr-2">Edit</button>
                <button @click="handleDelete(user._id)" class="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Pagination -->
        <div class="mt-4">
          <nav class="flex items-center justify-between">
            <div class="flex-1 flex justify-between">
              <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <div class="ml-3">
                <span class="text-gray-700">
                  Page {{ meta.current_page }} of {{ meta.total }}
                </span>
              </div>
            </div>
            <div class="flex-1 flex justify-end">
              <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </template>


<script setup>
import { useRouter } from 'vue-router';
import { reactive, toRefs, onMounted, computed } from 'vue';
import { useUserStore } from '../../stores/User';

const router = useRouter();
const userStore = useUserStore();

const { users, meta } = toRefs(reactive(userStore));
const { fetchUserDataOnMount, handleDelete } = userStore;

const updateUser = (userId) => {
  router.push({ name: 'update', params: { userId } });
};


onMounted(fetchUserDataOnMount);
</script>