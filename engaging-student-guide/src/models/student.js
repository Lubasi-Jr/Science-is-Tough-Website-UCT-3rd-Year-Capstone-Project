export class Student {
  id; // Unique identifier for the content.
  studentYear;
  isInternational;
  email;
  points;
  level;

  // Constructor to initialize the Content class with id, imageSrc, title, and link.
  constructor(id, isInternational, studentYear, email, points) {
    this.id = id;
    this.studentYear = studentYear;
    this.isInternational = isInternational;
    this.email = email;
    this.points = points ?? 20;
    this.level = "Beginner";
  }

  static fromJson(obj) {
    console.log("To Student from object: ", obj)
    return new Student(
      obj.id,
      obj.isInternational,
      obj.year,
      obj.email,
      obj.points
    );
  }

  static toJson() {
    return {
      id: this.userId,
      isInternational: this.isInternational,
      year: this.studentYear,
      email: this.email,
      points: this.points,
      level: this.level,
    };
  }

  static empty() {
    return new Student("", false, 1, "", 0);
  }
}
