export class Quiz {
    id;
    questions;
    answers;
    options;
  
    constructor(id) {
      this.id = id;
    }
  }
  
  export class Question {
    question;
    options;
    constructor(q, o) {
      this.question = q;
      this.options = o;
    }
  }
  