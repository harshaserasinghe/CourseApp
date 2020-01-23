using CourseApp.Core.Entities;
using CourseApp.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CourseApp.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        public ICourseRepository CourseRepository { get; private set; }
        public CoursesController(ICourseRepository courseRepository)
        {
            CourseRepository = courseRepository;
        }

        [HttpGet("{id}")]
        public ActionResult<Course> Get(int id)
        {
            var course = CourseRepository.GetById(id);

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Course>> Get()
        {
            var courses = CourseRepository.GetAll();
            return Ok(courses);
        }

        [HttpPost]
        public IActionResult Post(Course newCourse)
        {
            CourseRepository.Add(newCourse);
            CourseRepository.Commit();
            return CreatedAtAction(nameof(Get), new { id = newCourse.Id }, newCourse);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Course updateCourse)
        {
            if (id != updateCourse.Id)
            {
                return BadRequest();
            }

            var existingCourse = CourseRepository.GetById(id);

            if (existingCourse == null)
            {
                return NotFound();
            }

            CourseRepository.Update(updateCourse, existingCourse);
            CourseRepository.Commit();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleteCourse = CourseRepository.GetById(id);

            if (deleteCourse == null)
            {
                return NotFound();
            }

            CourseRepository.Delete(deleteCourse);
            CourseRepository.Commit();
            return NoContent();
        }
    }
}
