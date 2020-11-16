
namespace NRELViewer.Models
{
    public class VehicleMilesTravelled
    {
        public int Id { get; set; }
        public string CityName { get; set; }
        public string State { get; set; }
        public long CityEstimate { get; set; }
        public long NatlAvgEstimate { get; set; }
        public long NatlPerCapitaEstimate { get; set; }
        public long GasUsed { get; set; }
        public long DieselUsed { get; set; }
        public long GasGhs { get; set; }
        public long DieselGhs { get; set; }
    }
}
