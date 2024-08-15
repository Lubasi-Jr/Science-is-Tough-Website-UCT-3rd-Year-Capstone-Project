// Exporting the Challenge class so it can be imported and used in other files.
export class Challenge {
  // Class properties to store various attributes of a challenge.
  id; // Unique identifier for the challenge.
  num_students; // Number of students participating in the challenge.
  top_students; // Array or list of the top-performing students.
  description; // Description of the challenge.
  reward; // Reward given to the winners of the challenge.
  date_created; // Date when the challenge was created.
  date_end; // Date when the challenge will end.
  name; // Name of the challenge.
  studentsStarting; // number  of students who are starting the challenge.

  // Constructor method to initialize a new instance of the Challenge class.
  constructor(
    id, // Unique identifier for the challenge.
    name, // Name of the challenge.
    description, // Description of the challenge.
    date_created, // Date when the challenge was created.
    date_end, // Date when the challenge will end.
    reward, // Award or prize for the challenge.
    studentsStarting // Array or list of students starting the challenge.
  ) {
    // Assigning the passed parameters to the corresponding class properties.
    this.id = id;
    this.description = description;
    this.reward = reward;
    this.date_created = date_created;
    this.date_end = date_end;
    this.name = name;
    this.studentsStarting = studentsStarting;
  }

  // Method to set the top students for the challenge.
  setTopStudents(s) {
    this.top_students = s;
  }

  // Method to set the number of students participating in the challenge.
  setNumStudents(n) {
    this.num_students = n;
  }

  // Method to retrieve the name of the challenge.
  getGames() {
    return this.name;
  }
}
