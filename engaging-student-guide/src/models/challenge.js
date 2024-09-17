// Exporting the Challenge class so it can be imported and used in other files.

import { Quiz } from "./quiz";

export class Challenge {
  // Class properties to store various attributes of a challenge.
  id; // Unique identifier for the challenge.
  noParticipants; // Number of students participating in the challenge.
  description; // Description of the challenge.
  reward; // Reward given to the winners of the challenge.
  date_created; // Date when the challenge was created.
  date_end; // Date when the challenge will end.

  quizzes; // the quizzes of the challenge

  // Constructor method to initialize a new instance of the Challenge class.
  constructor(
    id, // Unique identifier for the challenge.
    description, // Description of the challenge.
    // date_created, // Date when the challenge was created.
    date_end, // Date when the challenge will end.
    // reward, // Award or prize for the challenge.
    // studentsStarting // Array or list of students starting the challenge.
    quizzes,
    noParticipants
  ) {
    // Assigning the passed parameters to the corresponding class properties.
    this.id = id;
    this.description = description;
    this.date_end = date_end;
    this.quizzes = quizzes;
    this.noParticipants = noParticipants;
    // this.reward = reward;
    // this.date_created = date_created;
  }

  // Method to set the top students for the challenge.
  setTopStudents(s) {
    this.top_students = s;
  }

  // Method to set the number of students participating in the challenge.
  setNumStudents(n) {
    this.num_students = n;
  }

  static fromJson(obj) {
    let quizzes = [];

    for (let i = 0; i < obj.quizzes_list.length; i++) {
      const q_obj = obj.quizzes_list[i].quiz;
      const q_obj_done = obj.quizzes_list[i].done;
      const q = Quiz.fromJson(q_obj);
      q.setDone(q_obj_done)
      quizzes.push(q);
    }

    const challenge = obj.challenge_info;
    // formatting teh date to make it more readable
    function formatDate(d) {
      const date = new Date(d);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(date);
    }
    const endDate = formatDate(challenge.end_date);

    // const challengeData =
    // console.log("This was the challenge from json: ", challengeData);
    return new Challenge(challenge.id, challenge.description, endDate, quizzes, challenge.no_participants);
  }

  static empty() {
    return new Challenge("", "", "", [], 0);
  }

  // Method to retrieve the name of the challenge.
  getGames() {
    return this.name;
  }
}
