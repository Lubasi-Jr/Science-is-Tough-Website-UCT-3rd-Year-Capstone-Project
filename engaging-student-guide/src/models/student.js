export class Student {
  userId; // Unique identifier for the content.
  studentYear;
  studentType;
  email;
  points;
  level;

  // Constructor to initialize the Content class with id, imageSrc, title, and link.
  constructor(id, studentType, studentYear, email) {
    this.userId = id;
    this.studentYear = studentYear;
    this.studentType = studentType;
    this.email = email;
    this.points = 20;
    this.level = "Beginner";
  }

  static fromJson(id, studentType,studentYear,  email) {
    return new Student(id, studentType,studentYear, email);
  }

  toJson() {
    return {
      id: this.userId,
      studentType: this.studentType,
      year: this.studentYear,
      email: this.email,
      points: this.points,
      level: this.level,
    };
  }
}
