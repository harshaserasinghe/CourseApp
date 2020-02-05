import { Pipe, PipeTransform } from "@angular/core";
import { CourseLevel } from "src/app/course/models/course-level";

@Pipe({
  name: "enumMember"
})
export class EnumMemberPipe implements PipeTransform {
  transform(value: number): string {
    return CourseLevel[value];
  }
}
