import { firestore } from "./firebase";

import userInterface from "@/types/userInterface";
import { addResType, getResType } from "@/types/firebaseResults";

const collection = firestore.collection("users");

export const getUsers = async (): Promise<userInterface[]> => {
  const res = await collection.get();
  return res.docs.map((doc): userInterface => {
    return {
      id: doc.id,
      ...doc.data(),
    } as userInterface;
  });
};

export const getUserById = async (id: string): Promise<getResType> => {
  const res = await collection.doc(id).get();
  return res.exists ? res.data() : null;
};

export const addUser = async (item: userInterface): Promise<addResType> => {
  const res = await collection.add(item);
  return res ?? null;
};
