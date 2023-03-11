import { defineStore } from "pinia";
import { ref } from "vue";

import userSetInterface from "@/types/userSetInterface";
import UserSetModel from "@/models/UserSetModel";

export const useUserSetsStore = defineStore("user-sets-store", () => {
  const userId = ref<string>("o69Rqixm73sItmtTR7yB");
  const userSets = ref<userSetInterface[]>([]);

  const loadUserSets = async (): Promise<void> => {
    userSets.value = (await UserSetModel.getAll(userId.value)) ?? [];
  };

  return { userId, userSets, loadUserSets };
});
