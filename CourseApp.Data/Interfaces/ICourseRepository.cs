using CourseApp.Core.Entities;
using System.Collections.Generic;

namespace CourseApp.Data.Interfaces
{
    public interface ICourseRepository
    {
        Course GetById(int id);
        IEnumerable<Course> GetAll();
        Course Add(Course newCourse);
        void Update(Course updateCourse, Course existingCourse);
        void Delete(Course deleteCourse);
        int Commit();
    }
}
