namespace NRELViewer.Models
{
    public class GasStationRecord
    {
        public int Id { get; set; }

        public string StationName { get; set; }

        public string FuelType { get; set; }

        public string City { get; set; }
        public string State { get; set; }

        public int ZipCode { get; set; }

        public string Address { get; set; }
    }
}
