import { firestore } from "./firebase";
import userSetInterface from "@/types/userSetInterface";
import { addResType, getResType } from "@/types/firebaseResults";

const collectionId = "users";
const subCollectionId = "sets";
const collection = firestore.collection(collectionId);

export const getUserSets = async (
  userId: string
): Promise<userSetInterface[]> => {
  const res = await collection.doc(userId).collection(subCollectionId).get();
  return res.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as userSetInterface;
  });
};

export const getUserSetById = async (
  userId: string,
  id: string
): Promise<getResType> => {
  const res = await collection
    .doc(userId)
    .collection(subCollectionId)
    .doc(id)
    .get();
  return res.exists ? res.data() : null;
};

export const addUserSet = async (
  userId: string,
  item: userSetInterface
): Promise<addResType> => {
  const res = await collection
    .doc(userId)
    .collection(subCollectionId)
    .add(item);
  return res ?? null;
};

export const updateUserSet = async (
  userId: string,
  id: string,
  item: userSetInterface
): Promise<addResType> => {
  const res = await collection
    .doc(userId)
    .collection("rents")
    .doc(id)
    .update(item);
  return res != null ? res : null;
};

export const deleteUserSet = async (
  userId: string,
  id: string
): Promise<addResType> => {
  const res = await collection
    .doc(userId)
    .collection(subCollectionId)
    .doc(id)
    .delete();
  return res != null ? res : null;
};
