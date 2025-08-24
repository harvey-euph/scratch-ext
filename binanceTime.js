class BinanceTime {
  getInfo() {
    return {
      id: 'binancetime',
      name: 'Binance Time',
      blocks: [
        {
          opcode: 'getServerTime',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Binance server time'
        }
      ]
    };
  }

  async getServerTime() {
    try {
      const res = await fetch('https://api.binance.com/api/v3/time');
      const data = await res.json();
      return data.serverTime; // 回傳整數 (毫秒 timestamp)
    } catch (e) {
      return -1; // 發生錯誤就回傳 -1
    }
  }
}

Scratch.extensions.register(new BinanceTime());
