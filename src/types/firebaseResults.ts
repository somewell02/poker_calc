import firebase from "firebase/compat";

export type firestoreDocumentData = firebase.firestore.DocumentData;
export type firestoreDocumentReference = firebase.firestore.DocumentReference;
export type getResType = firestoreDocumentData | null | undefined;
export type addResType = firestoreDocumentReference | null;
