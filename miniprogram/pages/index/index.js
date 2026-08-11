Page({
  data: {
    count: 0
  },
  onHit() {
    this.setData({ count: this.data.count + 1 });
    // 可先注释音效和震动，避免音频文件缺失报错
    this.playSound();
     this.vibrate();
  },
  onReset() {
    wx.showModal({
      title: '确认重置',
      content: '确定要重置功德吗？',
      success: (res) => {
        if (res.confirm) this.setData({ count: 0 });
      }
    });
  },
  playSound() {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = '/sounds/muyu.mp3';
    innerAudioContext.play();
    innerAudioContext.onEnded(() => innerAudioContext.destroy());
    innerAudioContext.onError((err) => {
      console.error('音效播放失败', err);
      innerAudioContext.destroy();
    });
  },
  vibrate() {
    wx.vibrateShort({ type: 'light', fail: (err) => console.log('震动失败', err) });
  }
});