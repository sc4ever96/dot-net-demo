using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NRELViewer.Models;


namespace NRELViewer.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VehicleMilesTravelledController : ControllerBase
    {
        private readonly NRELContext _context;

        public VehicleMilesTravelledController(NRELContext context)
        {
            _context = context;
        }

        // GET api/<VehicleMilesTravelledController>/state/city
        [HttpGet("{state}/{city?}")]
        public VehicleMilesTravelled Get(string state, string city)
        {
            VehicleMilesTravelled pulledRecord = _context.VehicleMilesTravelled.FirstOrDefault(record => record.CityName == city && record.State == state );
            
            if(pulledRecord == null)
            {
                string requestString = string.Format(Utilities.VehicleMilesApi, state, city);
                string response = Utilities.SendHttpRequest(requestString).Result;
                var cityInfoResponse = JsonConvert.DeserializeObject<dynamic>(response);

                requestString = string.Format(Utilities.GasAndDieselUse, state, city);
                response = Utilities.SendHttpRequest(requestString).Result;
                var gasInfoResponse = JsonConvert.DeserializeObject<dynamic>(response);

                pulledRecord = Utilities.ParseVMTResults(cityInfoResponse ,gasInfoResponse);
                _context.VehicleMilesTravelled.Add(pulledRecord);
                _context.SaveChangesAsync();
            }
            return pulledRecord;
        }
    }
}
