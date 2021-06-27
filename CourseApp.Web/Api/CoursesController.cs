using AutoMapper;
using CourseApp.Core.DTOs;
using CourseApp.Core.Entities;
using CourseApp.Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CourseApp.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        public ICourseRepository CourseRepository { get; private set; }
        public IMapper Mapper { get; }

        public CoursesController(
            ICourseRepository courseRepository,
            IMapper mapper)
        {
            CourseRepository = courseRepository;
            Mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetAsync(int id)
        {
            var course = await CourseRepository.GetByIdAsync(id);
            var courseDTO = Mapper.Map<CourseDTO>(course);

            if (courseDTO == null)
            {
                return NotFound();
            }

            return Ok(courseDTO);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetAsync(string filter)
        {
            var courses = await CourseRepository.GetAllAsync(filter);
            var courseDTOs = Mapper.Map<IEnumerable<CourseDTO>>(courses);
            return Ok(courseDTOs);
        }

        //[Authorize]
        [HttpPost]
        public async Task<IActionResult> PostAsync(CourseCreateDTO courseCreateDTO)
        {
            var newCourse = Mapper.Map<Course>(courseCreateDTO);
            newCourse.PublishedDate = DateTime.Now;
            await CourseRepository.AddAsync(newCourse);
            await CourseRepository.CommitAsync();
            return CreatedAtAction(nameof(GetAsync), new { id = newCourse.Id }, newCourse);
        }

        //[Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, CourseUpdateDTO courseUpdateDTO)
        {
            if (id != courseUpdateDTO.Id)
            {
                return BadRequest();
            }

            var existingCourse = await CourseRepository.GetByIdAsync(id);

            if (existingCourse == null)
            {
                return NotFound();
            }

            var updateCourse = Mapper.Map<Course>(courseUpdateDTO);
            updateCourse.PublishedDate = existingCourse.PublishedDate;
            CourseRepository.Update(updateCourse, existingCourse);
            await CourseRepository.CommitAsync();
            return NoContent();
        }

        //[Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var deleteCourse = await CourseRepository.GetByIdAsync(id);

            if (deleteCourse == null)
            {
                return NotFound();
            }

            CourseRepository.Remove(deleteCourse);
            await CourseRepository.CommitAsync();
            return NoContent();
        }
    }
}
