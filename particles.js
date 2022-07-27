class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.toDelete = false
  }
  show() {
    fill(193, 210, 232);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
  remove() {
    this.toDelete = true
  }
  move() {
    this.y = this.y -= 5;
  }
  hits(invader) {
    let d = dist(this.x, this.y, invader.x, invader.y);
    if (d < this.r + invader.r) {
      return true;
    } else {
      return false;
    }
  }
}
