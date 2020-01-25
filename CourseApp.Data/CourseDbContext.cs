using CourseApp.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseApp.Data
{
    public class CourseDbContext : DbContext
    {
        public CourseDbContext(DbContextOptions<CourseDbContext> options) : base(options)
        {

        }

        public DbSet<Course> Courses { get; set; }
    }
}
