import chipInterface from "@/types/chipInterface";
import ChipsApi from "@/data/firebase/ChipsApi";

class ChipModel {
  static async getAll(): Promise<chipInterface[] | undefined> {
    try {
      return await ChipsApi.getChips();
    } catch (err) {
      console.error(err);
    }
  }
  static async getById(id: string): Promise<chipInterface | undefined> {
    try {
      return await ChipsApi.getChipById(id);
    } catch (err) {
      console.error(err);
    }
  }
}

export default ChipModel;
