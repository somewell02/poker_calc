import { firestore } from "./firebase.js";

const collection = firestore.collection("users");

export const getUsers = async () => {
  const res = await collection.get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getUserById = async (id) => {
  const res = await collection.doc(id).get();
  return res.exists ? res.data() : null;
};

export const addUser = async (item) => {
  const res = await collection.add(item);
  return res ?? null;
};
