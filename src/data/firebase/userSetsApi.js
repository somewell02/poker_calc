import { firestore } from "./firebase.js";

const collectionId = "users";
const subCollectionId = "sets";
const collection = firestore.collection(collectionId);

export const getUserSets = async (userId) => {
  const res = await collection.doc(userId).collection(subCollectionId).get();
  return res.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getUserSetById = async (userId, id) => {
  const res = await collection
    .doc(userId)
    .collection(subCollectionId)
    .doc(id)
    .get();
  return res.exists
    ? {
        id: id,
        ...res.data(),
      }
    : null;
};

export const addUserSet = async (userId, item) => {
  const res = await collection
    .doc(userId)
    .collection(subCollectionId)
    .add(item);
  return res ?? null;
};

export const updateUserSet = async (userId, id, item) => {
  const res = await collection
    .doc(userId)
    .collection("rents")
    .doc(id)
    .update(item);
  return res ?? null;
};

export const deleteUserSet = async (userId, id) => {
  const res = await collection
    .doc(userId)
    .collection(subCollectionId)
    .doc(id)
    .delete();
  return res ?? null;
};
