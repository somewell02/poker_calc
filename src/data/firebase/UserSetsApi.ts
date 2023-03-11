import { firestore } from "./firebase";
import userSetInterface from "@/types/userSetInterface";
import { addResType } from "@/types/firebaseResults";

const collectionId = "users";
const subCollectionId = "sets";
const collection = firestore.collection(collectionId);

class UserSetsApi {
  static async getUserSets(userId: string): Promise<userSetInterface[]> {
    const res = await collection.doc(userId).collection(subCollectionId).get();
    return res.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as userSetInterface;
    });
  }

  static async getUserSetById(
    userId: string,
    id: string
  ): Promise<userSetInterface | undefined> {
    const res = await collection
      .doc(userId)
      .collection(subCollectionId)
      .doc(id)
      .get();
    if (res.exists) {
      return {
        id: res.id,
        ...res.data(),
      } as userSetInterface;
    } else {
      return undefined;
    }
  }

  static async addUserSet(
    userId: string,
    item: userSetInterface
  ): Promise<addResType> {
    const res = await collection
      .doc(userId)
      .collection(subCollectionId)
      .add(item);
    return res ?? null;
  }

  static async updateUserSet(
    userId: string,
    id: string,
    item: userSetInterface
  ): Promise<addResType> {
    const res = await collection
      .doc(userId)
      .collection("rents")
      .doc(id)
      .update(item);
    return res != null ? res : null;
  }

  static async deleteUserSet(userId: string, id: string): Promise<addResType> {
    const res = await collection
      .doc(userId)
      .collection(subCollectionId)
      .doc(id)
      .delete();
    return res != null ? res : null;
  }
}

export default UserSetsApi;
