using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NRELViewer.Models;


namespace NRELViewer.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EnergyAndGhgController : ControllerBase
    {
        private readonly NRELContext _context;

        public EnergyAndGhgController(NRELContext context)
        {
            _context = context;
        }

        // GET api/<EnergyAndGhgController>/state/city
        [HttpGet("{state}/{city?}")]
        public List<EnergyAndGhg> Get(string state, string city)
        {
            List<EnergyAndGhg> pulledRecord = _context.EnergyAndGhgs.Where(record => string.Concat(record.State,record.CityName).ToLower() == string.Concat(state,city).ToLower()).ToList();

            if (!pulledRecord.Any())
            {
                string requestString = string.Format(Utilities.EnegyAndGhgApi, state, city);
                string response = Utilities.SendHttpRequest(requestString).Result;
                var energyInfoResponse = JsonConvert.DeserializeObject<dynamic>(response);

                pulledRecord = Utilities.ParseEnergyResult(energyInfoResponse);
                pulledRecord.ForEach(record =>_context.EnergyAndGhgs.Add(record));
                _context.SaveChangesAsync();
            }
            return pulledRecord;
        }
    }
}
