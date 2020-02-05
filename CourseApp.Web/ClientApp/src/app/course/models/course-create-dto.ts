import { CourseLevel } from "./course-level";

export interface ICourseCreateDTO {
  name: string;
  level: CourseLevel;
  rating: number;
  category: number;
  author: string;
}
