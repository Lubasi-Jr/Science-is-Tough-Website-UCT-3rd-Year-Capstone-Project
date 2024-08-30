export class Student {
  userId; // Unique identifier for the content.
  studentYear;
  isInternational;
  email;
  points;
  level;

  // Constructor to initialize the Content class with id, imageSrc, title, and link.
  constructor(id, isInternational, studentYear, email) {
    this.userId = id;
    this.studentYear = studentYear;
    this.isInternational = isInternational;
    this.email = email;
    this.points = 20;
    this.level = "Beginner";
  }

  static fromJson(id, isInternational,studentYear,  email) {
    return new Student(id, isInternational,studentYear, email);
  }

  toJson() {
    return {
      id: this.userId,
      isInternational: this.isInternational,
      year: this.studentYear,
      email: this.email,
      points: this.points,
      level: this.level,
    };
  }
}
