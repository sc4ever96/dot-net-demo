using NRELViewer.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace NRELViewer
{
    public class Utilities
    {
        public static readonly string SiteAddress = "https://developer.nrel.gov/";
        public static readonly string GasStationApi = "api/alt-fuel-stations/v1.json?api_key=h5ZBdZYzJrD9l23j9CKMpT5GmtFLTnRUVTSFhn7g&limit=200";
        public static readonly string EnegyAndGhgApi = "api/cleap/v1/energy_expenditures_and_ghg_by_sector?city={1}&state_abbr={0}&api_key=h5ZBdZYzJrD9l23j9CKMpT5GmtFLTnRUVTSFhn7g";
        public static readonly string VehicleMilesApi = "api/cleap/v1/city_vmt_estimates?city={1}&state_abbr={0}&api_key=h5ZBdZYzJrD9l23j9CKMpT5GmtFLTnRUVTSFhn7g";
        public static readonly string GasAndDieselUse = "api/cleap/v1/gasoline_and_diesel_use?city={1}&state_abbr={0}&api_key=h5ZBdZYzJrD9l23j9CKMpT5GmtFLTnRUVTSFhn7g";

        public static async Task<string> SendHttpRequest(string requestUrl)
        {
            string result = "";
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(SiteAddress);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await client.GetAsync(requestUrl).ConfigureAwait(false);

                if (response.IsSuccessStatusCode)
                {
                    result = response.Content.ReadAsStringAsync().Result;
                }
            }
            return result;
        }

        /// <summary>
        /// Creates gas station records from recieved json response
        /// </summary>
        /// <param name="obj">dynamic json object</param>
        /// <returns>record</returns>
        public static List<GasStationRecord> ParseGasStationResult(dynamic obj)
        {
            List<GasStationRecord> records = new List<GasStationRecord>();

            foreach(var station in obj)
            {
                GasStationRecord record = new GasStationRecord()
                {
                    Id = station["id"],
                    StationName = station["station_name"],
                    State = station["state"],
                    City = station["city"],
                    ZipCode = station["zip"],
                    Address = station["street_address"],
                    FuelType = station["fuel_type_code"]
                };

                records.Add(record);
            }
            return records;
        }

        /// <summary>
        /// Creates city record for miles travelled and gas/diesel enviromental impact
        /// </summary>
        /// <param name="cityInfo">city info</param>
        /// <param name="gasInfo">fuel ghs info</param>
        /// <returns>record</returns>
        public static VehicleMilesTravelled ParseVMTResults(dynamic cityInfo, dynamic gasInfo)
        {
            VehicleMilesTravelled vehicleRecords = new VehicleMilesTravelled();
            var location = cityInfo["inputs"];
            vehicleRecords.State = location["state_abbr"];

            var resultIinfo = cityInfo["result"];

            foreach (var info in resultIinfo)
            {
                vehicleRecords.CityName = info.Name;
                var results = cityInfo["result"];
                foreach (var r in results)
                {
                    vehicleRecords.CityEstimate = r.Value["city_vmt_estimate"];
                    vehicleRecords.NatlAvgEstimate = r.Value["natl_avg_vmt_estimate"];
                    vehicleRecords.NatlPerCapitaEstimate = r.Value["natl_per_capita_vmt_estimate"];
                }
            }
            var result = gasInfo["result"][vehicleRecords.CityName]["city_fuel_use"];
            vehicleRecords.GasUsed = result["gas_gal"];
            vehicleRecords.DieselUsed = result["diesel_gal"];
            vehicleRecords.GasGhs = result["gas_ghg_lb"];
            vehicleRecords.DieselGhs = result["diesel_ghg_lb"];

            return vehicleRecords;
        }

        /// <summary>
        /// Creates record on energy use and environmental impact by sector for given city
        /// </summary>
        /// <param name="energyInfo">info</param>
        /// <returns>record</returns>
        public static List<EnergyAndGhg> ParseEnergyResult(dynamic energyInfo)
        {
            List<EnergyAndGhg> energyRecords = new List<EnergyAndGhg>();

            var location = energyInfo["inputs"];

            var resultIinfo = energyInfo["result"];

            foreach(var info in resultIinfo)
            {
                var results = energyInfo["result"];
                foreach(var result in results)
                {
                    foreach (var data in result.Value)
                    {
                        EnergyAndGhg sector = new EnergyAndGhg();
                        sector.CityName = info.Name;
                        sector.State = location["state_abbr"];
                        sector.Type = data.Name;
                        var sectorValues = data.First;
                        sector.Units = sectorValues[sector.Type == "residential" ? "housing_units" : "num_establishments"];
                        sector.ElecMwh = sectorValues["elec_mwh"];
                        sector.Population = sectorValues["total_pop"] ?? 0;
                        sector.ElecMwh = sectorValues["elec_mwh"];
                        sector.GasMcf = sectorValues["gas_mcf"];
                        sector.Elec1kDollars = sectorValues["elec_1kdollars"];
                        sector.Gas1kDollars = sectorValues["gas_1kdollars"];
                        sector.ElecLbGhg = sectorValues["elec_lb_ghg"];
                        sector.GasLbGhg = sectorValues["gas_lb_ghg"];
                        energyRecords.Add(sector);
                    }
                }
            }

            return energyRecords;
        }
    }
}
