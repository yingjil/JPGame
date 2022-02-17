const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const atlas = new Image()
atlas.src = 'images/Common.png'

let msg = ''

export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = '#ffffff'
    ctx.font = '20px Arial'

    ctx.fillText(
      score,
      10,
      30
    )

    if(score >= 10 && score <20) {
      msg = '生日快乐！'
    }else if (score >= 20 && score <30) {
      msg = '真棒，现在截图可以获得大餐一顿！'
    }else if (score >= 30 && score <50) {
      msg = '太厉害了，你已获得温泉度假一次！'
    }else if (score >= 50 && score <100) {
      msg = '终极大奖：执子之手，与子偕老！'
    }else if (score >= 100) {
      msg = '还玩！被你打爆了，以后都听你的！'
    }

    if(msg != ''){
      ctx.fillStyle = '#ffffff'
      ctx.font = '20px Arial'

      ctx.fillText(
        msg,
        10,
        60
      )
    }

  }

  renderGameOver(ctx, score) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = '#ffffff'
    ctx.font = '20px Arial'

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      `得分: ${score}`,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 - 100 + 255
    }
  }
}
