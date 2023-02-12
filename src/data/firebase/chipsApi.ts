import { firestore } from "./firebase";

import chipInterface from "@/types/chipInterface";
import { getResType } from "@/types/firebaseResults";

const collection = firestore.collection("chips");

export const getChips = async (): Promise<chipInterface[]> => {
  const res = await collection.get();
  return res.docs.map((doc): chipInterface => {
    return {
      id: doc.id,
      ...doc.data(),
    } as chipInterface;
  });
};

export const getChipById = async (id: string): Promise<getResType> => {
  const res = await collection.doc(id).get();
  return res.exists ? res.data() : null;
};
