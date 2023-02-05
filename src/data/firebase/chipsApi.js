import { firestore } from "./firebase.js";

const collection = firestore.collection("chips");

export const getChips = async () => {
  const res = await collection.get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getChipById = async (id) => {
  const res = await collection.doc(id).get();
  return res.exists ? res.data() : null;
};
