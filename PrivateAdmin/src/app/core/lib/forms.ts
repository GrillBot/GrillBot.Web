import { Dictionary } from "../models/common";
import { Support } from "./support";

export class FormsHelper {
    static createFlagsOptions(flagsType: any, textsType: any): Dictionary<number, string> {
        return Object.keys(flagsType)
            .map(o => parseInt(o, 10))
            .filter(o => !isNaN(o) && o > 0)
            .map(o => ({
                key: o,
                value: textsType[Support.getEnumKeyByValue(flagsType, o)] as string
            }));
    }
}
