import userSetItemInterface from "@/types/userSetItemInterface";

interface userSetInterface {
  id?: string;
  title?: string;
  items: userSetItemInterface[];
}

export default userSetInterface;
