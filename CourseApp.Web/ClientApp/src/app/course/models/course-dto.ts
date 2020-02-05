import { CourseLevel } from "./course-level";

export interface ICourseDTO {
  id: number;
  name: string;
  level: CourseLevel;
  rating: number;
  category: number;
  author: string;
  publishedDate: Date;
}
