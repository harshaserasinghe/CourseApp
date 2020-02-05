import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ICourseDTO } from "../../models/course-dto";
import { CourseService } from "../../../core/services/course.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ICourseUpdateDTO } from "../../models/course-update-dto";

@Component({
  selector: "app-course-edit",
  templateUrl: "./course-edit.component.html",
  styleUrls: ["./course-edit.component.css"]
})
export class CourseEditComponent implements OnInit {
  updateCourseForm: FormGroup;
  name: FormControl;
  level: FormControl;
  rating: FormControl;
  category: FormControl;
  author: FormControl;
  course: ICourseDTO;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.name = new FormControl("", Validators.required);
    this.level = new FormControl("", Validators.required);
    this.rating = new FormControl("", Validators.required);
    this.category = new FormControl("", Validators.required);
    this.author = new FormControl("", Validators.required);

    this.updateCourseForm = new FormGroup({
      name: this.name,
      level: this.level,
      rating: this.rating,
      category: this.category,
      author: this.author
    });

    let param = +this.route.snapshot.paramMap.get("id");
    this.getCourse(param);
  }

  getCourse(id: number): void {
    this.courseService.getCourse(id).subscribe(
      course => {
        this.course = course;
        this.mapCourse();
      },
      error => {
        console.log(error);
      }
    );
  }

  private mapCourse() {
    this.name.setValue(this.course.name);
    this.rating.setValue(this.course.rating);
    this.level.setValue(this.course.level);
    this.category.setValue(this.course.category);
    this.author.setValue(this.course.author);
  }

  updateCourse(): void {
    let courseUpdateDTO: ICourseUpdateDTO = {
      id: this.course.id,
      name: this.name.value,
      level: +this.level.value,
      rating: +this.rating.value,
      category: this.category.value,
      author: this.author.value
    };

    let param = +this.route.snapshot.paramMap.get("id");

    this.courseService.updateCourse(param, courseUpdateDTO).subscribe(
      () => {
        this.router.navigate(["/"]);
      },
      error => {
        console.log(error);
      }
    );
  }
}
