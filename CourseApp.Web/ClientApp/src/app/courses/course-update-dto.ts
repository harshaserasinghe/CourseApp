import { CourseLevel } from "./course-level";

export interface ICourseUpdateDTO {
  id: number;
  name: string;
  level: CourseLevel;
  rating: number;
  category: number;
  author: string;
}
