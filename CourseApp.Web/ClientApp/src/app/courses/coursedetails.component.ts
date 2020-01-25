import { Component, OnInit } from "@angular/core";
import { CourseService } from "./course.service";
import { ICourse } from "./course";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-coursedetails",
  templateUrl: "./coursedetails.component.html",
  styleUrls: ["./coursedetails.component.css"]
})
export class CourseDetailsComponent implements OnInit {
  course: ICourse;

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

  onBack(): void {
    this.router.navigate(["/"]);
  }
}
