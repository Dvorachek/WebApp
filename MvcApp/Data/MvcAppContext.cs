using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MvcApp.Models
{
    public class MvcAppContext : DbContext
    {
        public MvcAppContext (DbContextOptions<MvcAppContext> options)
            : base(options)
        {
        }

        public DbSet<MvcApp.Models.Music> Music { get; set; }
    }
}
