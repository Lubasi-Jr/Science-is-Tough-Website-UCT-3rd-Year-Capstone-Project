export class Challenge {
    id;
    num_students;
    top_students;
    description;
    award;
    date_created;
    name;
    studentsStarting;
    endDate;
    constructor(id, description, award, name, studentsStarting, endDate) {
      this.id = id;
      this.description = description;
      this.award = award;
      // this.date_created = date_created;
      this.name = name;
      this.studentsStarting = studentsStarting;
      this.endDate = endDate;
    }
  
    setTopStundents(s) {
      this.top_students = s;
    }
  
    setNumStudents(n) {
      this.num_students = n;
    }
  
    getGames() {
      return this.name;
    }
  }
  