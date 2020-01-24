using CourseApp.Core.Entities;
using FluentValidation;

namespace CourseApp.Core.Validators
{
    public class CourseValidator : AbstractValidator<Course>
    {
        public CourseValidator()
        {
            RuleFor(c => c.Name).NotEmpty();
            RuleFor(c => c.Level).NotEmpty();
            RuleFor(c => c.Rating).NotEmpty().InclusiveBetween(1, 5);
            RuleFor(c => c.Category).NotEmpty();
            RuleFor(c => c.Author).NotEmpty();
        }
    }
}
