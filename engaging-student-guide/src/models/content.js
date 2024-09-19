// Base class for different types of content, which includes properties common to all content types.
export class Content {
  id; // Unique identifier for the content.
  imageSrc; // Source URL of the image associated with the content.
  title; // Title of the content.
  link; // Link or URL to the content in db.

  // Constructor to initialize the Content class with id, imageSrc, title, and link.
  constructor(id, imageSrc, title, link) {
    this.id = id;
    this.imageSrc = imageSrc;
    this.title = title;
    this.link = link;
  }
}

// Subclass of Content for handling audio content.
export class AudioContent extends Content {
  duration; // Duration of the audio content in seconds or minutes.

  // Constructor to initialize AudioContent with additional duration property.
  constructor(id, imageSrc, title, link, duration) {
    super(id, imageSrc, title, link); // Calling the constructor of the parent Content class.
    this.duration = duration; // Setting the duration specific to audio content.
  }

  // Method to simulate playing the audio content.
  play() {
    console.log(`Playing audio: ${this.title}`);
  }
}

// Subclass of Content for handling text content.
export class TextContent extends Content {
  author; // Author of the text content.

  // Constructor to initialize TextContent with additional author property.
  constructor(id, imageSrc, title, link, author) {
    super(id, imageSrc, title, link); // Calling the constructor of the parent Content class.
    this.author = author; // Setting the author specific to text content.
  }

  // simulate reading the text content.
  read() {
    console.log(`Reading text content by ${this.author}: ${this.title}`);
  }
}
