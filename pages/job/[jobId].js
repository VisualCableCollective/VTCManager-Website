import {useEffect, useState} from "react";
import {HTTPRequestUtils} from "../../utils/HTTPRequestUtils";
import {useRouter} from "next/router";
import NumberFormat from "react-number-format";
import {
    FaBox,
    FaMapMarkedAlt,
    FaRoad,
    FaStar,
    FaTachometerAlt,
    FaWarehouse,
    FaWeightHanging
} from "react-icons/fa";
import {FaCoins, FaTruck} from "react-icons/fa";
import {LogbookUtils} from "../../utils/LogbookUtils";
import {VictoryAxis, VictoryChart, VictoryLegend, VictoryLine, VictoryVoronoiContainer} from "victory";

export default function JobPage() {
    const router = useRouter();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [chartSpeedData, setChartSpeedData] = useState([]);
    const [chartSpeedLimitData, setChartSpeedLimitData] = useState([]);
    const [averageSpeed, setAverageSpeed] = useState(0);
    const [maxSpeed, setMaxSpeed] = useState(0);

    let speedChartTheme = getSpeedChartTheme();

    let job_id = router.query.jobId;

    useEffect(() => {
        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.GetJobData, "", job_id), { headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('authtoken'), 'Accept': 'application/json' }) })
            .then(res => res.json())
            .then(
                (result) => {

                    result = {"id":42,"created_at":"2022-08-14T09:30:05.000000Z","updated_at":"2022-08-14T09:30:06.000000Z","user_id":45,"truck_model_id":"vehicle.scania.s_2016","city_departure_id":"antakya","city_destination_id":"istanbul","company_departure_id":"turkfood.antakya","company_destination_id":"tm_istanbul.istanbul","cargo_id":"used_plast_c","planned_distance_km":247,"special_job":0,"job_ingame_started":"0001-02-03 02:08:00","job_ingame_deadline":"0001-02-06 15:17:00","market_id":"freight_market","truck_cabin_damage_at_start":0,"truck_chassis_damage_at_start":0,"truck_engine_damage_at_start":4,"truck_transmission_damage_at_start":4,"truck_wheels_avg_damage_at_start":0,"trailer_avg_damage_chassis_at_start":0,"trailer_avg_damage_wheels_at_start":0,"truck_cabin_damage_at_end":null,"truck_chassis_damage_at_end":null,"truck_engine_damage_at_end":null,"truck_transmission_damage_at_end":null,"truck_wheels_avg_damage_at_end":null,"trailer_avg_damage_chassis_at_end":null,"trailer_avg_damage_wheels_at_end":null,"remaining_delivery_time":null,"remaining_distance":null,"cargo_damage":null,"cargo_mass":7867,"status":"started","income":4742,"company_id":22,"job_data_entries":[{"id":12072,"created_at":"2022-08-14T09:30:10.000000Z","updated_at":"2022-08-14T09:30:10.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":50,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:08:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12073,"created_at":"2022-08-14T09:30:15.000000Z","updated_at":"2022-08-14T09:30:15.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":50,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:08:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12074,"created_at":"2022-08-14T09:30:20.000000Z","updated_at":"2022-08-14T09:30:20.000000Z","job_id":42,"current_speed_kph":9,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:08:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12075,"created_at":"2022-08-14T09:30:25.000000Z","updated_at":"2022-08-14T09:30:25.000000Z","job_id":42,"current_speed_kph":21,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:08:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12076,"created_at":"2022-08-14T09:30:30.000000Z","updated_at":"2022-08-14T09:30:30.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:08:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12077,"created_at":"2022-08-14T09:30:36.000000Z","updated_at":"2022-08-14T09:30:36.000000Z","job_id":42,"current_speed_kph":3,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:09:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12078,"created_at":"2022-08-14T09:30:41.000000Z","updated_at":"2022-08-14T09:30:41.000000Z","job_id":42,"current_speed_kph":8,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:09:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12079,"created_at":"2022-08-14T09:30:46.000000Z","updated_at":"2022-08-14T09:30:46.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:09:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:12:40"},{"id":12080,"created_at":"2022-08-14T09:30:51.000000Z","updated_at":"2022-08-14T09:30:51.000000Z","job_id":42,"current_speed_kph":1,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:09:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:12:40"},{"id":12081,"created_at":"2022-08-14T09:30:56.000000Z","updated_at":"2022-08-14T09:30:56.000000Z","job_id":42,"current_speed_kph":8,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:10:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:12:38"},{"id":12082,"created_at":"2022-08-14T09:31:01.000000Z","updated_at":"2022-08-14T09:31:01.000000Z","job_id":42,"current_speed_kph":14,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:10:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:12:36"},{"id":12083,"created_at":"2022-08-14T09:31:06.000000Z","updated_at":"2022-08-14T09:31:06.000000Z","job_id":42,"current_speed_kph":8,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:10:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:12:34"},{"id":12084,"created_at":"2022-08-14T09:31:11.000000Z","updated_at":"2022-08-14T09:31:11.000000Z","job_id":42,"current_speed_kph":11,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:10:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:12:28"},{"id":12085,"created_at":"2022-08-14T09:31:16.000000Z","updated_at":"2022-08-14T09:31:16.000000Z","job_id":42,"current_speed_kph":23,"current_speed_limit_kph":50,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:11:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:12:16"},{"id":12086,"created_at":"2022-08-14T09:31:22.000000Z","updated_at":"2022-08-14T09:31:22.000000Z","job_id":42,"current_speed_kph":22,"current_speed_limit_kph":80,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:11:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":4,"current_truck_transmission_damage":4,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:11:53"},{"id":12087,"created_at":"2022-08-14T09:31:27.000000Z","updated_at":"2022-08-14T09:31:27.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":80,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:13:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":5,"current_truck_transmission_damage":5,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:11:37"},{"id":12088,"created_at":"2022-08-14T09:31:32.000000Z","updated_at":"2022-08-14T09:31:32.000000Z","job_id":42,"current_speed_kph":17,"current_speed_limit_kph":80,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:14:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":5,"current_truck_transmission_damage":5,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:11:27"},{"id":12089,"created_at":"2022-08-14T09:31:37.000000Z","updated_at":"2022-08-14T09:31:37.000000Z","job_id":42,"current_speed_kph":33,"current_speed_limit_kph":70,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:16:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":5,"current_truck_transmission_damage":5,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:10:41"},{"id":12090,"created_at":"2022-08-14T09:31:42.000000Z","updated_at":"2022-08-14T09:31:42.000000Z","job_id":42,"current_speed_kph":38,"current_speed_limit_kph":70,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:18:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":5,"current_truck_transmission_damage":5,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:10:03"},{"id":12091,"created_at":"2022-08-14T09:31:47.000000Z","updated_at":"2022-08-14T09:31:47.000000Z","job_id":42,"current_speed_kph":44,"current_speed_limit_kph":85,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:19:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":5,"current_truck_transmission_damage":5,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:08:50"},{"id":12092,"created_at":"2022-08-14T09:31:52.000000Z","updated_at":"2022-08-14T09:31:52.000000Z","job_id":42,"current_speed_kph":57,"current_speed_limit_kph":50,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:21:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":5,"current_truck_transmission_damage":5,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:07:43"},{"id":12093,"created_at":"2022-08-14T09:31:57.000000Z","updated_at":"2022-08-14T09:31:57.000000Z","job_id":42,"current_speed_kph":69,"current_speed_limit_kph":85,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:22:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":6,"current_truck_transmission_damage":6,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":1,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:06:21"},{"id":12094,"created_at":"2022-08-14T09:32:02.000000Z","updated_at":"2022-08-14T09:32:02.000000Z","job_id":42,"current_speed_kph":76,"current_speed_limit_kph":80,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:24:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":6,"current_truck_transmission_damage":6,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":1,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:04:36"},{"id":12095,"created_at":"2022-08-14T09:32:08.000000Z","updated_at":"2022-08-14T09:32:08.000000Z","job_id":42,"current_speed_kph":78,"current_speed_limit_kph":80,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:26:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":7,"current_truck_transmission_damage":7,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:02:40"},{"id":12096,"created_at":"2022-08-14T09:32:13.000000Z","updated_at":"2022-08-14T09:32:13.000000Z","job_id":42,"current_speed_kph":76,"current_speed_limit_kph":70,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:27:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":7,"current_truck_transmission_damage":7,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":2,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 20:00:38"},{"id":12097,"created_at":"2022-08-14T09:32:18.000000Z","updated_at":"2022-08-14T09:32:18.000000Z","job_id":42,"current_speed_kph":74,"current_speed_limit_kph":70,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:28:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":7,"current_truck_transmission_damage":7,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":2,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 19:59:38"},{"id":12098,"created_at":"2022-08-14T09:32:23.000000Z","updated_at":"2022-08-14T09:32:23.000000Z","job_id":42,"current_speed_kph":73,"current_speed_limit_kph":70,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:28:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":7,"current_truck_transmission_damage":7,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":2,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 19:59:27"},{"id":12099,"created_at":"2022-08-14T09:32:28.000000Z","updated_at":"2022-08-14T09:32:28.000000Z","job_id":42,"current_speed_kph":73,"current_speed_limit_kph":70,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:28:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":7,"current_truck_transmission_damage":7,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":2,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 19:59:27"},{"id":12100,"created_at":"2022-08-14T09:32:33.000000Z","updated_at":"2022-08-14T09:32:33.000000Z","job_id":42,"current_speed_kph":73,"current_speed_limit_kph":70,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:28:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":7,"current_truck_transmission_damage":7,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":2,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 19:59:27"},{"id":12101,"created_at":"2022-08-14T09:32:38.000000Z","updated_at":"2022-08-14T09:32:38.000000Z","job_id":42,"current_speed_kph":73,"current_speed_limit_kph":70,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:28:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":7,"current_truck_transmission_damage":7,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":2,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 19:59:27"},{"id":12102,"created_at":"2022-08-14T09:32:43.000000Z","updated_at":"2022-08-14T09:32:43.000000Z","job_id":42,"current_speed_kph":73,"current_speed_limit_kph":70,"trailers_attached":10,"current_ingame_time":"0001-02-03 02:28:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":7,"current_truck_transmission_damage":7,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":2,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-02 19:59:27"},{"id":12103,"created_at":"2022-08-14T09:32:49.000000Z","updated_at":"2022-08-14T09:32:49.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12104,"created_at":"2022-08-14T09:32:54.000000Z","updated_at":"2022-08-14T09:32:54.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12105,"created_at":"2022-08-14T09:32:59.000000Z","updated_at":"2022-08-14T09:32:59.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12106,"created_at":"2022-08-14T09:33:04.000000Z","updated_at":"2022-08-14T09:33:04.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12107,"created_at":"2022-08-14T09:33:09.000000Z","updated_at":"2022-08-14T09:33:09.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12108,"created_at":"2022-08-14T09:33:14.000000Z","updated_at":"2022-08-14T09:33:14.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12109,"created_at":"2022-08-14T09:33:19.000000Z","updated_at":"2022-08-14T09:33:19.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12110,"created_at":"2022-08-14T09:33:24.000000Z","updated_at":"2022-08-14T09:33:24.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12111,"created_at":"2022-08-14T09:33:29.000000Z","updated_at":"2022-08-14T09:33:29.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12112,"created_at":"2022-08-14T09:33:35.000000Z","updated_at":"2022-08-14T09:33:35.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12113,"created_at":"2022-08-14T09:33:40.000000Z","updated_at":"2022-08-14T09:33:40.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12114,"created_at":"2022-08-14T09:33:45.000000Z","updated_at":"2022-08-14T09:33:45.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"},{"id":12115,"created_at":"2022-08-14T09:33:50.000000Z","updated_at":"2022-08-14T09:33:50.000000Z","job_id":42,"current_speed_kph":0,"current_speed_limit_kph":0,"trailers_attached":10,"current_ingame_time":"0001-01-01 00:00:00","current_truck_cabin_damage":0,"current_truck_chassis_damage":0,"current_truck_engine_damage":0,"current_truck_transmission_damage":0,"current_truck_wheels_avg_damage":0,"current_trailer_avg_damage_chassis":0,"current_trailer_avg_damage_wheels":0,"navigation_distance_remaining":0,"navigation_time_remaining":"0001-01-01 00:00:00"}],"truck_model":{"id":"vehicle.scania.s_2016","truck_manufacturer_id":"scania","name":"S","truck_manufacturer":{"id":"scania","name":"Scania"}},"city_departure":{"id":"antakya","name":"Antakya"},"city_destination":{"id":"istanbul","name":"\u0130stanbul"},"company_departure":{"id":"turkfood.antakya","name":"Turkish Food","city_id":"antakya"},"company_destination":{"id":"tm_istanbul.istanbul","name":"Trade Market Istanbul","city_id":"istanbul"},"cargo":{"id":"used_plast_c","game_item_translation_id":"cargo.used_plast_c","game_item_translation":{"id":"cargo.used_plast_c","language_code":"de","value":"Altkunststoff"}},"user":{"id":45,"created_at":"2022-08-13T16:50:13.000000Z","updated_at":"2022-08-14T10:03:21.000000Z","bank_balance":20046,"current_game_running":"None","last_client_update":"2022-08-14 10:03:21","PositionX":null,"PositionY":null,"PositionZ":null,"OrientationHeading":null,"company_id":22,"latest_vcc_api_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiZWVmM2JiOWI5ZDBmMDMyNWQwODg3YTUyYTZlNDhiMWIwOTA2NTA3ZDNmMjE0ZjE0NzVmNjhjNDYwMTU5OWU5ZWU5NjQyNmM2Mjg3ZmIxNDMiLCJpYXQiOjE2NjA0MDk2NDkuMjc5MjQ5LCJuYmYiOjE2NjA0MDk2NDkuMjc5MjUyLCJleHAiOjE2OTE5NDU2NDkuMjYyNjg0LCJzdWIiOiI0NSIsInNjb3BlcyI6WyJnZXQtdmNjLWlkIl19.nHpi1ombzSTSWNnKY-pI2XPnYO_arF_B6XTpTxudB7qzKs74BPkdCaVoj9jbSerwb8mQunykxW8FS_eUXCcIJwi4oghaRP0-NR1xqupKqy6Bivb7AuAuk7BrZ9ZjGX8i9MnTMn2VMNVaH33Vc-HC9uSFCVWU9lEaXax2dnVUwzBRHMlZ5V2m-1gkITaje4Q6oFG0cuQS62ML3F55NEto_aEJPQAl9tuZwM9ZzKqCAG4vyHyzYB82q2HXA5N0rOaMsWA0ucMVoBxnof4DHELc3iNi_4yajVgzC7vipKy_qAcv8dY6kJYLKZgsNMJ-6QNN4QW9SBH4BviA9-9XVjeUXfHyFBaZtvwj9P0sEWFI1CTNaEFsx5VlR3BrOkpukPlLZxilLELrsROvih4a48W3a7gYRZ0Vze-lQQXVOUQvkplZeqMrQkeYxFLFIv6Eug1xBPDD3xtrMqV0HTCkt2inuzLvb-aNsdOhaKFGEWleRr06neRha9w8d948OQlBakJetuUIpRaNFI4GXGx3LGGrMTsKbU7X40BuYZTjc8JN2jL55PDjKSvEhDK9vqtyPjKi2ry5GToRw1AxWMz1F6naTNtN9VxMA_xbEPaji8ze7-xrFPn8TrXtLi3BOTn1r5HZMZMx2StRtlkLAAegH7Vs7mqYdsp2ocRlTDc7FRL6Qio"}};

                    let _SpeedData = [];
                    let _SpeedLimitData = [];
                    let _averageSpeed = 0;
                    let _averageSpeedValues = 0;
                    let _maxSpeed = 0;

                    if(result.job_data_entries){
                        if(result.job_data_entries.length > 0){

                            result.job_data_entries.forEach(function (element, index){
                                if(element.current_speed_kph > 1){
                                    _averageSpeed += element.current_speed_kph;
                                    _averageSpeedValues++;
                                }

                                if(element.current_speed_kph > _maxSpeed)
                                    _maxSpeed = element.current_speed_kph;

                                // element is first or last item
                                if ((index + 1) === result.job_data_entries.length || index === 0) {
                                    _SpeedData.push({x: new Date(element.created_at), y: element.current_speed_kph});
                                    _SpeedLimitData.push({x: new Date(element.created_at), y: element.current_speed_limit_kph});
                                } else {
                                    // determine if speed has changed since last update
                                    if (_SpeedData[_SpeedData.length - 1].y !== element.current_speed_kph) {
                                        _SpeedData.push({x: new Date(element.created_at), y: element.current_speed_kph});
                                        _SpeedLimitData.push({x: new Date(element.created_at), y: element.current_speed_limit_kph});
                                    }
                                }
                            });

                            console.log(_SpeedData);

                            _averageSpeed = _averageSpeed/_averageSpeedValues;
                        }
                    }

                    setChartSpeedData(_SpeedData);
                    setChartSpeedLimitData(_SpeedLimitData);
                    setData(result);
                    setAverageSpeed(isNaN(_averageSpeed) ? 0 : _averageSpeed);
                    setMaxSpeed(_maxSpeed);
                    setLoading(false)
                },
                (error) => {
                }
            )
    }, [job_id]);

    console.log(averageSpeed)

    return (<div className="page-wrapper p-6 navbar-top-margin">
            <div className="w-full bg-dark-3 rounded p-5 mb-6">
                {loading ?
                    <div className="w-full flex items-center justify-center">
                        <div className="flex items-center">
                            <div className="lds-ellipsis">
                                <div/>
                                <div/>
                                <div/>
                                <div/>
                            </div>
                            <h1 className="text-3xl font-bold ml-5">Loading shipping documents...</h1>
                        </div>
                    </div>
                    : <h1 className="text-3xl text-center font-bold">Job No. {job_id} | User ID: {data.user ? data.user.id : "n/a"}</h1>}
            </div>
            {!loading &&
                <div>
                    <div className="top-stats-overview-wrapper w-full grid gap-6 sm:grid-cols-5">
                        <div className="stats-card rounded h-28 w-full bg-dark-3 p-5 flex">
                            <div className="flex-grow self-center">
                                <h1 className="text-3xl"><NumberFormat value={averageSpeed} decimalSeparator="," displayType="text" suffix=" km/h" defaultValue={0} fixedDecimalScale={true} decimalScale={2} /></h1>
                                <p className="text-opacity-70 text-white mt-1">Average Speed</p>
                            </div>
                            <div className="flex-none self-center">
                                <FaTachometerAlt size="42px" />
                            </div>
                        </div>
                        <div className="stats-card rounded h-28 w-full bg-dark-3 p-5 flex">
                            <div className="flex-grow self-center">
                                <h1 className="text-3xl"><NumberFormat value={maxSpeed} decimalSeparator="," displayType="text" suffix=" km/h" defaultValue={0} fixedDecimalScale={true} decimalScale={0} /></h1>
                                <p className="text-opacity-70 text-white mt-1">Maximum Speed</p>
                            </div>
                            <div className="flex-none self-center">
                                <FaTachometerAlt size="42px" />
                            </div>
                        </div>
                        <div className="stats-card rounded h-28 w-full bg-dark-3 p-5 flex">
                            <div className="flex-grow self-center">
                                <h1 className="text-3xl"><NumberFormat value={data.income} thousandSeparator="." decimalSeparator="," displayType="text" suffix=" €" defaultValue={0} fixedDecimalScale={true} decimalScale={2} /></h1>
                                <p className="text-opacity-70 text-white mt-1">Money Earned</p>
                            </div>
                            <div className="flex-none self-center">
                                <FaCoins size="42px" />
                            </div>
                        </div>
                        <div className="stats-card rounded h-28 w-full bg-dark-3 p-5 flex">
                            <div className="flex-grow self-center">
                                <h1 className="text-3xl"><NumberFormat value={data.planned_distance_km} thousandSeparator="." decimalSeparator="," displayType="text" suffix=" km" defaultValue={0} fixedDecimalScale={true} decimalScale={0} /></h1>
                                <p className="text-opacity-70 text-white mt-1">Planned Distance</p>
                            </div>
                            <div className="flex-none self-center">
                                <FaRoad size="42px" />
                            </div>
                        </div>
                        <div className="stats-card rounded h-28 w-full bg-dark-3 p-5 flex">
                            <div className="flex-grow self-center">
                                <h1 className="text-3xl">{LogbookUtils.getJobStatusText(data.status)}</h1>
                                <p className="text-opacity-70 text-white mt-1">Job Status</p>
                            </div>
                            <div className="flex-none self-center">
                                {LogbookUtils.getJobStatusIcon(data.status, "42px")}
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-dark-3 rounded my-6">
                        <div className={chartSpeedData.length > 0 ? "block" : "hidden"}>
                            <VictoryChart
                                theme={speedChartTheme}
                                width={1400}
                                height={500}
                                padding={{right: 25, left: 70, top: 40, bottom: 60}}
                                domainPadding={{y: 20}}
                                containerComponent={<VictoryVoronoiContainer
                                    labels={({ datum }) => datum.childName === "speed-chart-line-speed" ? `Speed: ${datum.y} km/h` : `Speed limit: ${datum.y} km/h\nTime: ${datum.x}`}
                                    voronoiDimension="x"
                                />}
                            ><VictoryLegend x={125} y={50}
                                            orientation="horizontal"
                                            gutter={20}
                                            style={{ border: { stroke: "black" }, zIndex: 30 }}
                                            data={[
                                                { name: "Speed Limit", symbol: { fill: "#ff375f" } },
                                                { name: "Current Speed", symbol: { fill: "#64d2ff" } },
                                            ]}
                            />
                                <VictoryAxis dependentAxis label={"Speed"} />
                                <VictoryAxis label={"Time"} fixLabelOverlap={true}/>
                                <VictoryLine
                                    style={{
                                        data: { stroke: "#64d2ff" },
                                        parent: { border: "1px solid #ccc"}
                                    }}
                                    name="speed-chart-line-speed"
                                    data={chartSpeedData}
                                    interpolation="natural"
                                />
                                <VictoryLine
                                    style={{
                                        data: { stroke: "#ff375f" },
                                        parent: { border: "1px solid #ccc"}
                                    }}
                                    name="speed-chart-line-speed-limit"
                                    data={chartSpeedLimitData}
                                />
                            </VictoryChart>
                        </div>
                        <div className={chartSpeedData.length <= 0 ? "block" : "hidden"}>
                            <h2 className="font-bold text-2xl text-white text-opacity-70 text-center py-16">Speed data is not available for this job.</h2>
                        </div>
                    </div>
                    <div className="w-full bg-dark-3 rounded px-5 py-7 my-6 grid grid-cols-4 gap-4">
                        <div className="mx-auto">
                            <h1 className="font-bold text-2xl mb-3 text-center">Truck Information</h1>
                            <div className="flex items-center mb-1">
                                <FaTruck icon="truck" size="1.25em" className="mr-3"/>
                                <p>Truck: { data.truck_model ? (data.truck_model.truck_manufacturer.name + " " + data.truck_model.name): "n/a"}</p>
                            </div>
                        </div>
                        <div className="mx-auto">
                            <h1 className="font-bold text-2xl mb-3 text-center">Route Information</h1>
                            <div className="flex items-center mb-1">
                                <FaRoad size="1.25em" className="mr-3"/>
                                <p>Planned Distance: <NumberFormat value={data.planned_distance_km} thousandSeparator="." decimalSeparator="," displayType="text" suffix=" km" defaultValue={0} fixedDecimalScale={true} decimalScale={0} /></p>
                            </div>
                            <div className="flex items-center mb-1">
                                <FaMapMarkedAlt size="1.25em" className="mr-3"/>
                                <p>Departure: { data.city_departure ? (data.city_departure.name + ", " + data.company_departure.name): "n/a"}</p>
                            </div>
                            <div className="flex items-center mb-1">
                                <FaMapMarkedAlt size="1.25em" className="mr-3"/>
                                <p>Destination: { data.city_destination ? (data.city_destination.name + ", " + data.company_destination.name): "n/a"}</p>
                            </div>
                        </div>
                        <div className="mx-auto">
                            <h1 className="font-bold text-2xl mb-3 text-center">Cargo Information</h1>
                            <div className="flex items-center mb-1">
                                <FaBox size="1.25em" className="mr-3"/>
                                <p>Cargo: { data.cargo ? LogbookUtils.getCargoName(data.cargo): "n/a"}</p>
                            </div>
                            <div className="flex items-center mb-1">
                                <FaWeightHanging size="1.25em" className="mr-3"/>
                                <p>Weight: <NumberFormat value={LogbookUtils.getCargoMass(data.cargo_mass)} thousandSeparator="." decimalSeparator="," displayType="text" suffix=" t" defaultValue={0} decimalScale={2} /></p>
                            </div>
                        </div>
                        <div className="mx-auto">
                            <h1 className="font-bold text-2xl mb-3 text-center">Job Information</h1>
                            <div className="flex items-center mb-1">
                                <FaCoins size="1.25em" className="mr-3"/>
                                <p>Earnings: <NumberFormat value={data.income} thousandSeparator="." decimalSeparator="," displayType="text" suffix=" €" defaultValue={0} fixedDecimalScale={true} decimalScale={2} /></p>
                            </div>
                            <div className="flex items-center mb-1">
                                <FaStar size="1.25em" className="mr-3"/>
                                <p>Special Job: { data.special_job ? "Yes": "No"}</p>
                            </div>
                            <div className="flex items-center mb-1">
                                <FaWarehouse size="1.25em" className="mr-3"/>
                                <p>Job Type: { LogbookUtils.getJobType(data.market_id)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>);
}

function getSpeedChartTheme(){
    // Colors
    const yellow200 = "#FFF59D";
    const deepOrange600 = "#F4511E";
    const lime300 = "#DCE775";
    const lightGreen500 = "#8BC34A";
    const teal700 = "#00796B";
    const cyan900 = "#006064";
    const colors = [
        deepOrange600,
        yellow200,
        lime300,
        lightGreen500,
        teal700,
        cyan900
    ];
    const blueGrey50 = "#ECEFF1";
    const blueGrey300 = "#90A4AE";
    const blueGrey700 = "#455A64";
    const grey900 = "#212121";

// Typography
    const sansSerif = "'Helvetica Neue', 'Helvetica', sans-serif";
    const letterSpacing = "normal";
    const fontSize = 12;

// Layout
    const padding = 8;
    const baseProps = {
        width: 350,
        height: 350,
        padding: 50
    };

// * Labels
    const baseLabelStyles = {
        fontFamily: sansSerif,
        fontSize,
        letterSpacing,
        padding,
        fill: "#FFFFFFFF",
        stroke: "transparent",
        strokeWidth: 0
    };

    const centeredLabelStyles = Object.assign({ textAnchor: "middle" }, baseLabelStyles);

// Strokes
    const strokeDasharray = "10, 5";
    const strokeLinecap = "round";
    const strokeLinejoin = "round";

// Put it all together...
    return {
        area: Object.assign(
            {
                style: {
                    data: {
                        fill: grey900
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        axis: Object.assign(
            {
                style: {
                    axis: {
                        fill: "transparent",
                        stroke: blueGrey300,
                        strokeWidth: 2,
                        strokeLinecap,
                        strokeLinejoin
                    },
                    axisLabel: Object.assign({}, centeredLabelStyles, {
                        padding,
                        stroke: "transparent"
                    }),
                    grid: {
                        fill: "none",
                        stroke: blueGrey50,
                        strokeDasharray,
                        strokeLinecap,
                        strokeLinejoin,
                        pointerEvents: "painted"
                    },
                    ticks: {
                        fill: "transparent",
                        size: 5,
                        stroke: "#EBEBF599",
                        strokeWidth: 1,
                        strokeLinecap,
                        strokeLinejoin
                    },
                    tickLabels: Object.assign({}, baseLabelStyles, {
                        fill: "#EBEBF599"
                    })
                }
            },
            baseProps
        ),
        polarDependentAxis: Object.assign({
            style: {
                ticks: {
                    fill: "transparent",
                    size: 1,
                    stroke: "transparent"
                }
            }
        }),
        bar: Object.assign(
            {
                style: {
                    data: {
                        fill: blueGrey700,
                        padding,
                        strokeWidth: 0
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        boxplot: Object.assign(
            {
                style: {
                    max: { padding, stroke: blueGrey700, strokeWidth: 1 },
                    maxLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
                    median: { padding, stroke: blueGrey700, strokeWidth: 1 },
                    medianLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
                    min: { padding, stroke: blueGrey700, strokeWidth: 1 },
                    minLabels: Object.assign({}, baseLabelStyles, { padding: 3 }),
                    q1: { padding, fill: blueGrey700 },
                    q1Labels: Object.assign({}, baseLabelStyles, { padding: 3 }),
                    q3: { padding, fill: blueGrey700 },
                    q3Labels: Object.assign({}, baseLabelStyles, { padding: 3 })
                },
                boxWidth: 20
            },
            baseProps
        ),
        candlestick: Object.assign(
            {
                style: {
                    data: {
                        stroke: blueGrey700
                    },
                    labels: Object.assign({}, baseLabelStyles, { padding: 5 })
                },
                candleColors: {
                    positive: "#ffffff",
                    negative: blueGrey700
                }
            },
            baseProps
        ),
        chart: baseProps,
        errorbar: Object.assign(
            {
                borderWidth: 8,
                style: {
                    data: {
                        fill: "transparent",
                        opacity: 1,
                        stroke: blueGrey700,
                        strokeWidth: 2
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        group: Object.assign(
            {
                colorScale: colors
            },
            baseProps
        ),
        histogram: Object.assign(
            {
                style: {
                    data: {
                        fill: blueGrey700,
                        stroke: grey900,
                        strokeWidth: 2
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        legend: {
            colorScale: colors,
            gutter: 10,
            orientation: "vertical",
            titleOrientation: "top",
            style: {
                data: {
                    type: "circle"
                },
                labels: baseLabelStyles,
                title: Object.assign({}, baseLabelStyles, { padding: 5 }),
            }
        },
        line: Object.assign(
            {
                style: {
                    data: {
                        fill: "transparent",
                        opacity: 1,
                        stroke: blueGrey700,
                        strokeWidth: 2
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        pie: Object.assign(
            {
                colorScale: colors,
                style: {
                    data: {
                        padding,
                        stroke: blueGrey50,
                        strokeWidth: 1
                    },
                    labels: Object.assign({}, baseLabelStyles, { padding: 20 })
                }
            },
            baseProps
        ),
        scatter: Object.assign(
            {
                style: {
                    data: {
                        fill: blueGrey700,
                        opacity: 1,
                        stroke: "transparent",
                        strokeWidth: 0
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        stack: Object.assign(
            {
                colorScale: colors
            },
            baseProps
        ),
        tooltip: {
            style: Object.assign({}, baseLabelStyles, { padding: 0, pointerEvents: "none" }),
            flyoutStyle: {
                stroke: grey900,
                strokeWidth: 1,
                fill: "#f0f0f0",
                pointerEvents: "none"
            },
            flyoutPadding: 5,
            cornerRadius: 5,
            pointerLength: 10
        },
        voronoi: Object.assign(
            {
                style: {
                    data: {
                        fill: "transparent",
                        stroke: "transparent",
                        strokeWidth: 0
                    },
                    labels: Object.assign({}, baseLabelStyles, { padding: 5, pointerEvents: "none" }),
                    flyout: {
                        stroke: grey900,
                        strokeWidth: 1,
                        fill: "#48484AFF",
                        pointerEvents: "none"
                    }
                }
            },
            baseProps
        )
    };
}