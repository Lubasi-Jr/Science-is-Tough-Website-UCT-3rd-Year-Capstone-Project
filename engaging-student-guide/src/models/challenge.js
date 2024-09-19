// Exporting the Challenge class so it can be imported and used in other files.
export class Challenge {
  // Class properties to store various attributes of a challenge.
  id; // Unique identifier for the challenge.
  description; // Description of the challenge.
  date_created; // Date when the challenge was created.
  date_end; // Date when the challenge will end.
  completedCount; // the number of items to complete
  wasCompleted; // how many items of this challenge a student completed

  // Constructor method to initialize a new instance of the Challenge class.
  constructor(
    id, // Unique identifier for the challenge.
    description, // Description of the challenge.
    date_end, // Date when the challenge will end.
    noParticipants,
    completedCount
  ) {
    // Assigning the passed parameters to the corresponding class properties.
    this.id = id;
    this.description = description;
    this.date_end = date_end;
    this.noParticipants = noParticipants;
    this.completedCount = completedCount;
  }

  static fromJson(obj) {
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

    return new Challenge(
      challenge.id,
      challenge.description,
      endDate,
      challenge.no_participants,
      challenge.completed_count
    );
  }

  static empty() {
    return new Challenge("", "", "", 0);
  }

  // Method to retrieve the name of the challenge.
  getGames() {
    return this.name;
  }
}
