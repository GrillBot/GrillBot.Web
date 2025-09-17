import { UnverifyInfo } from "./unverify-info";

export interface UserInfo {
  selfUnverifyMinimalTime: string | null;
  currentUnverifies: { [key: string]: UnverifyInfo };
  selfUnverifyCount: { [key: string]: number };
  unverifyCount: { [key: string]: number };
}
