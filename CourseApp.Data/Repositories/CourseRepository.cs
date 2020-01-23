using CourseApp.Core.Entities;
using CourseApp.Data.Interfaces;
using Microsoft.EntityFrameworkCore;
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

        public IEnumerable<Course> GetAll()
        {
            return CourseDbContext.Courses.ToList();
        }

        public Course GetById(int id)
        {
            return CourseDbContext.Courses.Find(id);
        }
        public Course Add(Course newCourse)
        {
            CourseDbContext.Courses.Add(newCourse);
            return newCourse;
        }

        public Course Update(Course updateCourse)
        {
            var entity = CourseDbContext.Attach(updateCourse);
            entity.State = EntityState.Modified;
            return updateCourse;
        }

        public Course Delete(int id)
        {
            var deleteCourse = GetById(id);
            if (deleteCourse != null)
            {
                CourseDbContext.Courses.Remove(deleteCourse);
            }
            return deleteCourse;
        }

        public int Commit()
        {
            return CourseDbContext.SaveChanges();
        }
    }
}
