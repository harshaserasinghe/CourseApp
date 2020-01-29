import { Pipe, PipeTransform } from "@angular/core";
import { CourseLevel } from "../courses/course";

@Pipe({
  name: "enumMember"
})
export class EnumMemberPipe implements PipeTransform {
  transform(value: number): string {
    return CourseLevel[value];
  }
}
