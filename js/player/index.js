import Sprite from '../base/sprite'
import Bullet from './bullet'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/hero.png'
const PLAYER_WIDTH = 80
const PLAYER_HEIGHT = 80
const BULLET_FIRE_MAX = 5
const BULLET_FIRE_MIN = 1
const BULLET_POS = 15
const BULLET_OFFSET = 1
const BULLET_SPEED = 3

const databus = new DataBus()

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = screenHeight - this.height - 30

    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false

    this.bullets = []

    // 初始化事件监听
    this.initEvent()
  }

  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在飞机上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30

    return !!(x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation)
  }

  /**
   * 根据手指的位置设置飞机的位置
   * 保证手指处于飞机中间
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(x, y) {
    let disX = x - this.width / 2
    let disY = y - this.height / 2

    if (disX < 0) disX = 0

    else if (disX > screenWidth - this.width) disX = screenWidth - this.width

    if (disY <= 0) disY = 0

    else if (disY > screenHeight - this.height) disY = screenHeight - this.height

    this.x = disX
    this.y = disY
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      //
      if (this.checkIsFingerOnAir(x, y)) {
        this.touched = true

        this.setAirPosAcrossFingerPosZ(x, y)
      }
    }))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()

      const x = e.touches[0].clientX
      const y = e.touches[0].clientY

      if (this.touched) this.setAirPosAcrossFingerPosZ(x, y)
    }))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()

      this.touched = false
    }))
  }
  /**
   * 实现火力加强
   * @param {*} nums 火力数量
   */
  shootEnhance(nums){
    if (nums > BULLET_FIRE_MAX) nums = BULLET_FIRE_MAX;
    if (nums < BULLET_FIRE_MIN) nums = BULLET_FIRE_MIN;
    let initPos = 0;
    let initOffset = 0;
    if (nums >= 2){
      initPos = -(Math.floor(nums / 2) * BULLET_POS);
    }
    if (nums >= 2){
      initOffset = -Math.floor(nums / 2) * BULLET_OFFSET;
    }
    for(let i = 0; i < nums; i++){
      if (nums % 2 == 0 && i == nums / 2) {
        initPos += BULLET_POS;
        initOffset += BULLET_OFFSET;
      }
      this.shootBeta(initPos,nums % 2 == 0 ? 0 : initOffset);
      initOffset += BULLET_OFFSET;
      initPos += BULLET_POS;
    }
  }
  /**
   * 
   * @param {*} pos 子弹与飞机自身的位置
   *         例如：
   *         0:从飞机中间发射； 
   *         -1：从飞机左侧1个宽度发射
   *         1：从飞机右侧1个宽度发射
   * @param {*} offset 子弹射出后，每次刷新时X轴的偏移量
   */
  shootBeta(pos,offset) {
    const bullet = databus.pool.getItemByClass('bullet', Bullet)

    bullet.init(
      this.x + this.width / 2 - bullet.width / 2 + pos,
      this.y - 10,
      BULLET_SPEED,
      offset
    )

    databus.bullets.push(bullet)
  }
  /**
   * 玩家射击操作
   * 射击时机由外部决定
   */
  shoot() {
    this.shootEnhance(Math.floor(databus.score / 10) + 1);
  }
}
