class Invader {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 12.5;
    this.dirX = 0.9;
    this.toDelete = false;
  }
  show() {
    image(invaderImg, this.x, this.y, this.r * 2, this.r * 2);
    // fill(255)
    // ellipse(this.x, this.y, this.r*2, this.r*2)
  }
  shiftDown() {
    this.dirX *= -1;
    this.y += this.r * 2;
  }
  remove() {
    this.toDelete = true;
  }
  move() {
    this.x = this.x += this.dirX;
  }
  gameOver() {
    if (this.y >= height - 30) {
      return true;
    } else {
      return false;
    }
  }
}
