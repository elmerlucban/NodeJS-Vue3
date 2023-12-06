import { defineStore } from 'pinia';
import { ref, reactive, toRefs } from 'vue';
import Users from  '../services/userService';

export const useUserStore = defineStore('users', () => {
    const state = reactive({
        page: 1,
        limit: 10,
        users: [],
        user: {},
        userId: null,
        meta: {},
    });

    const actions = {
        async fetchUserDataOnMount() {
            try {
              const data = await Users.getAllUser({ page: state.page, limit: state.limit });

              state.users = data.data.data;
              state.meta  = data.data.meta;
            } catch (error) {
              console.log(error);
            }
        },

        async handleCreate(data) {
            try {
                const response = await Users.createUser(data);
            } catch (error) {
            console.log(error);
            }
        },

        async handleFindUser(userId) {
            try {
                const response = await Users.findUser(userId);

                state.user = response.data.data;
            } catch (error) {
                console.log(error);
            }
        },

        async handleUpdate(userId, data) {
            try {
                const response = await Users.updateUser(userId, data);
            } catch (error) {
            console.log(error);
            }
        },

        async handleDelete(userId) {
            try {
                await Users.deleteUser(userId);

                const index = state.users.findIndex((item) => item.id === userId);
                state.users.splice(index, 1);
            } catch (error) {
            console.log(error);
            }
        },
    };
    
    return { ...toRefs(state), ...actions };
});