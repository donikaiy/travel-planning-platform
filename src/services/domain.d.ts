import {RowDataPacket} from "mysql2";

export type Service = {
    serviceId: number,
    text: string,
}

export type ServiceDB = RowDataPacket & {
    service_id: number,
    text: string,
}
