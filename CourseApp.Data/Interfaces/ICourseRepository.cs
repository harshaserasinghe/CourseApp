using CourseApp.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CourseApp.Data.Interfaces
{
    public interface ICourseRepository
    {
        Task<Course> GetByIdAsync(int id);
        Task<IEnumerable<Course>> GetAllAsync(string filter);
        Task<Course> AddAsync(Course newCourse);
        void Update(Course updateCourse, Course existingCourse);
        void Remove(Course deleteCourse);
        Task<int> CommitAsync();
    }
}
