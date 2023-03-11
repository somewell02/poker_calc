import userSetInterface from "@/types/userSetInterface";
import UserSetsApi from "@/data/firebase/UserSetsApi";

class UserSetModel {
  static async getAll(userId: string): Promise<userSetInterface[] | undefined> {
    try {
      return await UserSetsApi.getUserSets(userId);
    } catch (err) {
      console.error(err);
    }
  }
  static async getById(
    userId: string,
    setId: string
  ): Promise<userSetInterface | undefined> {
    try {
      return await UserSetsApi.getUserSetById(userId, setId);
    } catch (err) {
      console.error(err);
    }
  }
}

export default UserSetModel;
