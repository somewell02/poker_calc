import { firestore } from "./firebase";
import chipInterface from "@/types/chipInterface";

const collection = firestore.collection("chips");

class ChipsApi {
  static async getChips(): Promise<chipInterface[]> {
    const res = await collection.get();
    return res.docs.map((doc): chipInterface => {
      return {
        id: doc.id,
        ...doc.data(),
      } as chipInterface;
    });
  }

  static async getChipById(id: string): Promise<chipInterface | undefined> {
    const res = await collection.doc(id).get();
    if (res.exists) {
      return {
        id: res.id,
        ...res.data(),
      } as chipInterface;
    } else {
      return undefined;
    }
  }
}

export default ChipsApi;
