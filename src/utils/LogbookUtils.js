import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export default class LogbookUtils {
    static getJobStatusIcon(status, IconSize = "lg"){
        switch (status) {
            case "started":
                return <FontAwesomeIcon icon="truck" color={"#46d3e3"} className={"mr-2"} size={IconSize}/>;
            case "delivered":
                return <FontAwesomeIcon icon="check-circle" color={"#24f23c"} className={"mr-2"} size={IconSize}/>;
            case "cancelled":
                return <FontAwesomeIcon icon="times-circle" color={"#de1b1b"} className={"mr-2"} size={IconSize}/>;
            default:
                return <FontAwesomeIcon icon="question-circle" color={"#c2c2c2"} className={"mr-2"} size={IconSize}/>;
        }
    }

    static getJobStatusText(status){
        switch (status) {
            case "started":
                return "Started";
            case "delivered":
                return "Delivered";
            case "cancelled":
                return "Cancelled";
            default:
                return "n/a";
        }
    }

    static getCargoName(cargo){
        let cargoName = "n/a";
        if(cargo.game_item_translation){
            cargoName = cargo.game_item_translation.value;
        }else if (cargo.id){
            cargoName = cargo.id;
        }
        return cargoName;
    }

    static getCargoMass(cargo_mass){
        return cargo_mass/1000;
    }

    static getJobType(market_id){
        switch(market_id){
            case "quick_job":
                return "Quick Job";
            default:
                return "Unknown";
        }
    }
}