
namespace NRELViewer.Models
{
    public class EnergyAndGhg
    {
        public int Id { get; set; }
        public string CityName { get; set; }
        public string State { get; set; }
        public string Type { get; set; }
        public long Units { get; set; }
        public long Population { get; set; }
        public long ElecMwh { get; set; }
        public long GasMcf { get; set; }
        public long Elec1kDollars { get; set; }
        public long Gas1kDollars { get; set; }
        public long ElecLbGhg { get; set; }
        public long GasLbGhg { get; set; }
    }
}
