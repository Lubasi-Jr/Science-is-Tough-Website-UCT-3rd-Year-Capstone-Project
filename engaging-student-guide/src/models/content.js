export class Content {
  id;
  imageSrc;
  title;
  link;
  constructor(id, imageSrc, title, link) {
    // if (new.target === Content) {
    //   throw new Error("Cannot instantiate an abstract class.");
    // }
    this.id = id;
    this.imageSrc = imageSrc;
    this.title = title;
    this.link = link;
  }
}

export class AudioConent extends Content {
  duration;

  constructor(id, imageSrc, title, link, duration) {
    super(id, imageSrc, title, link);
    this.duration = duration;
  }

  play() {
    console.log(`Playing audio: ${this.title}`);
  }
}
export class VideoConent extends Content {
  duration;
  resolution;

  constructor(id, imageSrc, title, link, duration, resolution) {
    super(id, imageSrc, title, link);
    this.duration = duration;
    this.resolution = resolution;
  }

  play() {
    console.log(
      `Playing video: ${this.title} at ${this.resolution} resolution`
    );
  }
}
export class TextConent extends Content {
  author;

  constructor(id, imageSrc, title, link, author) {
    super(id, imageSrc, title, link);
    this.author = author;
  }

  read() {
    console.log(`Reading text content by ${this.author}: ${this.title}`);
  }
}
