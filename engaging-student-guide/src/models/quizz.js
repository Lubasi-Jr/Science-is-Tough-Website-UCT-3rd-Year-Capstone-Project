// Class representing a Quiz, containing a set of questions, answers, and options.
export class Quiz {
  id; // Unique identifier for the quiz.
  questions; // questions included in the quiz.
  answers; // answers corresponding to the questions.
  options; // options available for each question.

  // Constructor to initialize the Quiz with an id.
  constructor(id) {
    this.id = id; // Assign the unique identifier to the quiz.
    // The questions, answers, and options properties could be initialized later.
    // implement, when intergrating with database
  }
}

// Class representing a Question within a Quiz.
export class Question {
  question; // The text or content of the question.
  options; // Array or list of options provided as possible answers to the question.

  // Constructor to initialize the Question with a question and its options.
  constructor(q, o) {
    this.question = q; // Assign the question content.
    this.options = o; // Assign the options for the question.
  }
}
