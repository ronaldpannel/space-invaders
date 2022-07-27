class Spaceship {
  constructor() {
    this.x = width / 2;
    this.dirX = 0;
  }
  show() {
    rectMode(CENTER);
    image(rocketImg, this.x - 25, height - 60, 55, 55);
    // fill(255)
    // rect(this.x, height -20, 20, 50);
  }
  setDir(dir) {
    this.dirX = dir;
  }
  move(dir) {
    this.x += this.dirX * 10;
  }
}
