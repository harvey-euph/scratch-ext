class TradingExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.user = {
      apiKey: "",
      privateKey: ""
    };
    this.order = {
      symbol: "",
      side: "",
      qty: 0
    };
  }

  getInfo() {
    return {
      id: 'tradingExt',
      name: 'Trading API',
      color1: '#FF8800',
      blocks: [
        {
          opcode: 'setUser',
          blockType: Scratch.BlockType.COMMAND,
          text: '設定 API key [API] 和 Private key [SECRET]',
          arguments: {
            API: { type: Scratch.ArgumentType.STRING, defaultValue: 'myApiKey' },
            SECRET: { type: Scratch.ArgumentType.STRING, defaultValue: 'myPrivateKey' }
          }
        },
        {
          opcode: 'setOrder',
          blockType: Scratch.BlockType.COMMAND,
          text: '設定訂單 Symbol [SYMBOL] Side [SIDE] 數量 [QTY]',
          arguments: {
            SYMBOL: { type: Scratch.ArgumentType.STRING, defaultValue: 'BTCUSDT' },
            SIDE: { type: Scratch.ArgumentType.STRING, menu: 'sideMenu' },
            QTY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
          }
        },
        {
          opcode: 'sendOrder',
          blockType: Scratch.BlockType.COMMAND,
          text: '送出訂單'
        }
      ],
      menus: {
        sideMenu: {
          acceptReporters: true,
          items: ['BUY', 'SELL']
        }
      }
    };
  }

  setUser(args) {
    this.user.apiKey = args.API;
    this.user.privateKey = args.SECRET;
    console.log("✅ User set:", this.user);
  }

  setOrder(args) {
    this.order.symbol = args.SYMBOL;
    this.order.side = args.SIDE;
    this.order.qty = args.QTY;
    console.log("✅ Order set:", this.order);
  }

  async sendOrder() {
    if (!this.user.apiKey || !this.user.privateKey) {
      console.log("⚠️ 請先設定 API key 和 Private key");
      return;
    }
    if (!this.order.symbol || !this.order.side || !this.order.qty) {
      console.log("⚠️ 請先設定訂單");
      return;
    }

    const payload = {
      apiKey: this.user.apiKey,
      privateKey: this.user.privateKey,
      order: this.order
    };

    console.log("📤 Sending order:", payload);

    try {
      const res = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      console.log("✅ Response:", data);
    } catch (e) {
      console.error("❌ Error sending order:", e);
    }
  }
}

Scratch.extensions.register(new TradingExtension());
