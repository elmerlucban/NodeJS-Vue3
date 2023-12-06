import NotFoundErrorPage from "../views/errors/NotFoundErrorPage.vue"
import UsersPage from "../views/users/Index.vue";
import CreateUsersPage from "../views/users/Create.vue";
import UpdateUsersPage from "../views/users/Update.vue";

const routes = [
  {
    path: "/",
    component: UsersPage,
    name: "users",
  },
  {
    path: "/create",
    component: CreateUsersPage,
    name: "create",
  },
  {
    path: '/update/:userId',
    component: UpdateUsersPage,
    name: "update",
  },
  {
    path: "/:notFound(.*)",
    name: "error.404",
    component: NotFoundErrorPage,
  },
];

export default routes;