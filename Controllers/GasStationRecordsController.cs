using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NRELViewer.Models;
using Newtonsoft.Json;

namespace NRELViewer.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GasStationRecordsController : ControllerBase
    {
        private readonly NRELContext _context;

        public GasStationRecordsController(NRELContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<GasStationRecord>> GetInfo()
        {
            if (!_context.GasStationRecords.Any())
            {

                List<GasStationRecord> gasStationRecords = GetRecords();
                _context.GasStationRecords.AddRange(gasStationRecords);
                await _context.SaveChangesAsync();
                return gasStationRecords;
            }
            else
            {
                return _context.GasStationRecords.Select(record =>record).ToList();
            }
        }

        // GET: api/GasStationRecords/5
        [HttpGet("{state}/{city?}")]
        public List<GasStationRecord> GetGasStationRecord(string state, string city)
        {
            List<GasStationRecord> gasStationRecord = _context.GasStationRecords.Where(record => record.State == state).ToList();
            if (!string.IsNullOrEmpty(city))
                gasStationRecord = gasStationRecord.FindAll(record => record.City.ToLower() == city.ToLower());
            if (gasStationRecord.Count == 0)
                gasStationRecord = GetRecords(state);

            return gasStationRecord;
        }

        private List<GasStationRecord> GetRecords(string state = "")
        {
            string requestString = Utilities.GasStationApi + (string.IsNullOrEmpty(state) ? "" : $"&state={state}"); 
            string response = Utilities.SendHttpRequest(requestString).Result;
            var gasStationResponse = JsonConvert.DeserializeObject<dynamic>(response);
            return Utilities.ParseGasStationResult(gasStationResponse["fuel_stations"]);

        }
       
    }
}
