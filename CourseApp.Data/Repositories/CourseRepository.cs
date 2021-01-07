using CourseApp.Core.Entities;
using CourseApp.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CourseApp.Data.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        public CourseDbContext CourseDbContext { get; private set; }

        public CourseRepository(CourseDbContext courseDbContext)
        {
            CourseDbContext = courseDbContext;
        }

        public async Task<IEnumerable<Course>> GetAllAsync(string filter)
        {
            var query = CourseDbContext.Courses.AsQueryable();

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(c => c.Name.Contains(filter)).AsQueryable();
            }

            return await query.ToListAsync();
        }

        public async Task<Course> GetByIdAsync(int id)
        {
            return await CourseDbContext.Courses.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Course> AddAsync(Course newCourse)
        {
            await CourseDbContext.Courses.AddAsync(newCourse);
            return newCourse;
        }

        public void Update(Course updateCourse, Course existingCourse)
        {
            CourseDbContext.Entry(existingCourse).CurrentValues.SetValues(updateCourse);
        }

        public void Remove(Course deleteCourse)
        {
            CourseDbContext.Courses.Remove(deleteCourse);
        }

        public async Task<int> CommitAsync()
        {
            return await CourseDbContext.SaveChangesAsync();
        }
    }
}
