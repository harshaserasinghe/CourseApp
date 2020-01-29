import { Component, OnInit } from "@angular/core";
import { ICourse, CourseLevel } from "./course";
import { CourseService } from "./course.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"]
})
export class CourseListComponent implements OnInit {
  courses: ICourse[] = [];
  filterBy: string = "";
  closeResult: string;
  selectedCourseId: number;

  constructor(
    private courseService: CourseService,
    private modalService: NgbModal
  ) {}

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

  deleteCourse() {
    this.courseService.removeCourse(this.selectedCourseId).subscribe(
      () => {
        this.updateCourses();
        this.modalService.dismissAll();
      },
      error => {
        console.log(error);
      }
    );
  }

  private updateCourses() {
    let index = this.courses.findIndex(c => c.id == this.selectedCourseId);
    this.courses.splice(index, 1);
    this.selectedCourseId = 0;
  }

  open(deleteModal, id: number) {
    this.modalService
      .open(deleteModal, {
        ariaLabelledBy: "modal-basic-title",
        centered: true,
        backdrop: "static"
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    this.selectedCourseId = id;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
