class MySquare {
  getInfo() {
    return {
      id: 'mysquare',
      name: 'My Square',
      blocks: [
        {
          opcode: 'square',
          blockType: Scratch.BlockType.REPORTER,
          text: 'f of [NUM]',
          arguments: {
            NUM: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2
            }
          }
        }
      ]
    };
  }

  square(args) {
    return args.NUM * args.NUM;
  }
}

Scratch.extensions.register(new MySquare());
