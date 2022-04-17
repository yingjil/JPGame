import Sprite from '../base/sprite'
import DataBus from '../databus'

const BULLET_IMG_SRC = 'images/bullet.png'
const BULLET_WIDTH = 16
const BULLET_HEIGHT = 30

const __ = {
  speed: Symbol('speed')
}

const databus = new DataBus()

export default class Bullet extends Sprite {
  constructor() {
    super(BULLET_IMG_SRC, BULLET_WIDTH, BULLET_HEIGHT)
  }

  init(x, y, speed,offset) {
    this.x = x
    this.y = y
    this.offset = offset  //index of bullet; 
    this[__.speed] = speed

    this.visible = true
  }

  // 每一帧更新子弹位置
  update() {
    this.y -= this[__.speed]
    this.x += this.offset;
    // 超出屏幕外回收自身
    if (this.y < -this.height) databus.removeBullets(this)
  }
}
