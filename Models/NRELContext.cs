using Microsoft.EntityFrameworkCore;

namespace NRELViewer.Models
{
    public class NRELContext :DbContext
    {
        public DbSet<GasStationRecord> GasStationRecords { get; set; }

        public DbSet<VehicleMilesTravelled> VehicleMilesTravelled { get; set; }

        public DbSet<EnergyAndGhg> EnergyAndGhgs { get; set; }


        public NRELContext(DbContextOptions<NRELContext> options) : base(options) { }

    }
}
