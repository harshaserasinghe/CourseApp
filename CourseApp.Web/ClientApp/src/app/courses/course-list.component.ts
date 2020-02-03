import { Component, OnInit } from "@angular/core";
import { ICourseDTO } from "./course-dto";
import { CourseService } from "./course.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { OrderPipe } from "ngx-order-pipe";

@Component({
  selector: "course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"]
})
export class CourseListComponent implements OnInit {
  courses: ICourseDTO[] = [];
  filterBy: string = "";
  closeResult: string;
  selectedCourseId: number;
  order: string = "name";
  reverse: boolean = false;

  constructor(
    private courseService: CourseService,
    private modalService: NgbModal,
    private orderPipe: OrderPipe
  ) {}

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.courseService.getCourses(this.filterBy).subscribe(
      courses => {
        this.courses = this.orderPipe.transform(
          courses,
          this.order,
          this.reverse,
          true
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteCourse() {
    this.courseService.removeCourse(this.selectedCourseId).subscribe(
      () => {
        this.updateTable();
        this.modalService.dismissAll();
      },
      error => {
        console.log(error);
      }
    );
  }

  private updateTable() {
    let index = this.courses.findIndex(c => c.id == this.selectedCourseId);
    this.courses.splice(index, 1);
    this.selectedCourseId = 0;
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
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
