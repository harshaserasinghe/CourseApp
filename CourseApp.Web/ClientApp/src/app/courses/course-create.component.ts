import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ICourse } from "./course";
import { CourseService } from "./course.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-course-create",
  templateUrl: "./course-create.component.html",
  styleUrls: ["./course-create.component.css"]
})
export class CourseCreateComponent implements OnInit {
  newCourseForm: FormGroup;
  name: FormControl;
  level: FormControl;
  rating: FormControl;
  category: FormControl;
  author: FormControl;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit() {
    this.name = new FormControl("", Validators.required);
    this.level = new FormControl("", Validators.required);
    this.rating = new FormControl("", Validators.required);
    this.category = new FormControl("", Validators.required);
    this.author = new FormControl("", Validators.required);

    this.newCourseForm = new FormGroup({
      name: this.name,
      level: this.level,
      rating: this.rating,
      category: this.category,
      author: this.author
    });
  }

  addCourse(): void {
    let course: ICourse = {
      name: this.name.value,
      level: +this.level.value,
      rating: +this.rating.value,
      category: this.category.value,
      author: this.author.value
    };
    this.courseService.addCourse(course).subscribe(
      () => {
        this.router.navigate(["/"]);
      },
      error => {
        console.log(error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(["/"]);
  }
}
