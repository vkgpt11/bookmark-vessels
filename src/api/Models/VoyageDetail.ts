export interface VoyageDetail {
    active_scac: string;
    actual_arrival_lt: Date;
    actual_arrival_utc: Date;
    actual_departure_lt: Date;
    actual_departure_utc: Date;
    id: string;
    port_code: string;
    port_name: string;
    predicted_arrival_lt?: any;
    predicted_arrival_utc?: any;
    predicted_departure_lt?: any;
    predicted_departure_utc?: any;
    prediction_time_utc?: any;
    scheduled_arrival_lt: Date;
    scheduled_arrival_utc: Date;
    scheduled_departure_lt: Date;
    scheduled_departure_utc: Date;
}
