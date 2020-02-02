using AutoMapper;
using CourseApp.Core.DTOs;
using CourseApp.Core.Entities;
using CourseApp.Core.Validators;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CourseApp.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        public UserManager<User> UserManager { get; }
        public IMapper Mapper { get; }
        public UserValidator UserValidator { get; }

        public AccountsController(UserManager<User> userManager, IMapper mapper, UserValidator userValidator)
        {
            UserManager = userManager;
            Mapper = mapper;
            UserValidator = userValidator;
        }

        [HttpPost]
        public IActionResult Register(UserRegistrationDTO userRegistrationDTO)
        {
            var valRes = UserValidator.Validate(userRegistrationDTO);

            if (!valRes.IsValid)
            {
                return BadRequest(valRes.ToString());
            }

            var user = Mapper.Map<User>(userRegistrationDTO);
            var result = UserManager.CreateAsync(user, userRegistrationDTO.Password).Result;

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }
    }
}