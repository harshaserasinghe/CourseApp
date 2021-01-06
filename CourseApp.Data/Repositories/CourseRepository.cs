using CourseApp.Core.Entities;
using CourseApp.Data.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace CourseApp.Data.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        public CourseDbContext CourseDbContext { get; private set; }

        public CourseRepository(CourseDbContext courseDbContext)
        {
            CourseDbContext = courseDbContext;
        }

        public IEnumerable<Course> GetAll(string filter)
        {
            var query = CourseDbContext.Courses.AsQueryable();

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(c => c.Name.Contains(filter)).AsQueryable();
            }

            return query.ToList();
        }

        public Course GetById(int id)
        {
            return CourseDbContext.Courses.FirstOrDefault(c => c.Id == id);
        }

        public Course Add(Course newCourse)
        {
            CourseDbContext.Courses.Add(newCourse);
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

        public int Commit()
        {
            return CourseDbContext.SaveChanges();
        }
    }
}
