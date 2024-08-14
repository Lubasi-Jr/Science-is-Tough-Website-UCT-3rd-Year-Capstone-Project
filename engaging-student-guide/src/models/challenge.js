export class Challenge {
    id;
    num_students;
    top_students;
    description;
    award;
    date_created;
    date_end;
    name;
    studentsStarting;
    constructor(
      id,
      name,
      description,
      date_created,
      date_end,
      award,
      studentsStarting,
    ) {
      this.id = id;
      this.description = description;
      this.award = award;
      this.date_created = date_created;
      this.date_end = date_end;
      this.name = name;
      this.studentsStarting = studentsStarting;
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
  