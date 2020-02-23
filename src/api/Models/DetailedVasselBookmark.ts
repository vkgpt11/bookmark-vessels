import { Ais } from "./Ais";
import { VoyageDetail } from "./VoyageDetail";
import { VesselBookmark } from "./VesselBookmark";

export interface DetailedVesselBookmark {
    actual_arrival_lt: Date;
    actual_arrival_utc: Date;
    ais: Ais;
    id: string;
    msg: string;
    org_id: string;
    predicted_arrival_lt?: any;
    predicted_arrival_utc?: any;
    prediction_confidence_level?: any;
    prediction_time_utc?: any;
    scheduled_arrival_lt: Date;
    scheduled_arrival_utc: Date;
    success: boolean;
    target_port_code: string;
    target_port_name: string;
    vessel_bookmark: VesselBookmark;
    voyage_details: VoyageDetail[];
}
