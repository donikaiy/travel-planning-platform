import type {RowDataPacket} from "mysql2";

export type Exist = RowDataPacket & {
    exist: number
}
