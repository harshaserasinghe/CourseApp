using CourseApp.Core.Entities;
using System.Collections.Generic;

namespace CourseApp.Data.Interfaces
{
    public interface ICourseRepository
    {
        Course GetById(int id);
        IEnumerable<Course> GetAll();
        Course Add(Course course);
        Course Update(Course course);
        Course Delete(int id);
        int Commit();
    }
}
