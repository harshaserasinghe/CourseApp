export interface ICourse {
  id?: number;
  name: string;
  level: CourseLevel;
  rating: number;
  category: number;
  author: string;
  publishedDate?: Date;
}

export enum CourseLevel {
  Basic = 1,
  Intermediate = 2,
  Advance = 3
}
