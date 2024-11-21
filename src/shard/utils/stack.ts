class Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  // 入栈
  push(element: T): void {
    this.items.push(element);
  }

  // 出栈
  pop(): T | undefined {
    return this.items.pop();
  }

  // 获取栈顶元素
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  clear(): void {
    this.items = [];
  }

  // 栈是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 栈大小
  size(): number {
    return this.items.length;
  }
}

export default Stack;
