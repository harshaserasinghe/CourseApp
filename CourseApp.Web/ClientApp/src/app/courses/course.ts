export interface ICourse {
  id: number;
  name: string;
  level: CourseLevel;
  rating: number;
  category: number;
  publishedDate: Date;
  author: string;
}

enum CourseLevel {
  basic = 1,
  intermediate = 2,
  advance = 3
}
