import { Component, OnInit } from "@angular/core";
import { CourseService } from "./course.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-course-delete",
  templateUrl: "./course-delete.component.html",
  styleUrls: ["./course-delete.component.css"]
})
export class CourseDeleteComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.deleteCourse();
  }

  deleteCourse() {
    let param = +this.route.snapshot.paramMap.get("id");
    this.courseService.deleteCourse(param).subscribe(
      () => {
        this.router.navigate(["/"]);
      },
      error => {
        console.log(error);
      }
    );
  }
}
