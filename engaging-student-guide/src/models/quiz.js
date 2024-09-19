// Class representing a Quiz, containing a set of questions, answers, and options.
export class Quiz {
  id; // Unique identifier for the quiz.
  questions; // questions included in the quiz.
  contentTitle;
  challengeId;
  contentId;
  points;
  done;

  // Constructor to initialize the Quiz with an id.
  constructor(id, challengeId, contentId, contentTitle, points) {
    this.id = id; // Assign the unique identifier to the quiz.
    this.questions = [];
    this.contentTitle = contentTitle;
    this.challengeId = challengeId;
    this.contentId = contentId;
    this.points = points;
    this.done = false;
    // Assign the challenge id. can be null if quiz is not associated with a challenge
  }

  static fromJson(obj) {
    return new Quiz(
      obj.id,
      obj.challenge_id,
      obj.content_id,
      obj.content_title,
      obj.points
    );
  }

  setQuestions(qs) {
    for (let i = 0; i < qs.length; i++) {
      if (this.questions.length === 3) {
        return;
      }
      this.questions.push(Question.fromJson(qs[i]));
    }
  }

  static empty() {
    const q = new Quiz("", "", "", "", 0);
    q.questions = [];
    return q;
  }
}

// Class representing a Question within a Quiz.
export class Question {
  id;
  question; // The text or content of the question.
  options; // Array or list of options provided as possible answers to the question.
  // Constructor to initialize the Question with a question and its options.
  constructor(i, q, o) {
    this.id = i; // Assign the id.
    this.question = q; // Assign the question content.
    this.options = o; // Assign the options for the question.
  }

  static fromJson(obj) {
    const question = obj.question;
    const options = question.options;
    return new Question(question.id, question.question, options);
  }
}
