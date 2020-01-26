import { Component, OnInit } from "@angular/core";
import { ICourse } from "./course";
import { CourseService } from "./course.service";

@Component({
  selector: "course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"]
})
export class CourseListComponent implements OnInit {
  courses: ICourse[] = [];
  filterBy: string = "";

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses(this.filterBy).subscribe(
      courses => {
        this.courses = courses;
      },
      error => {
        console.log(error);
      }
    );
  }
}
