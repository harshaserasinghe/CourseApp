import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../../core/services/course.service";
import { ICourseDTO } from "../../models/course-dto";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.css"]
})
export class CourseDetailsComponent implements OnInit {
  course: ICourseDTO;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get("id");

    if (param) {
      this.getCourse(+param);
    }
  }

  getCourse(id: number) {
    this.courseService.getCourse(id).subscribe(
      course => {
        this.course = course;
      },
      error => {
        console.log(error);
      }
    );
  }
}
