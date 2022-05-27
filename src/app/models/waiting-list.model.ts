import { baseModel } from "./base.model";

export class WaitingList extends baseModel {
  organisationId: string;
  title: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  postCode: string;
  phone: string;
  email: string;
  sites: string;
}

export function compareWaitingList(s1: WaitingList, s2: WaitingList) {
  if (s1.created < s2.created) return -1;
  if (s1.created > s2.created) return 1;
  return 0;
}
