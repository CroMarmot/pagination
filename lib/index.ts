class Pagination {
  private mode: Mode = "range";

  private rangeStart = 1;
  private rangeEnd = 1;
  private rangeCurrent = 1;

  private arrayData = [1];
  private arrayIndex = 0;

  constructor() {
    this.mode = "range";
  }

  current() {
    if (this.mode === "range") {
      const list = [this.rangeCurrent];
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
      for (
        let i = 1;
        this.rangeCurrent <= Number.MAX_SAFE_INTEGER - ((1 << i) - 1) &&
        this.rangeCurrent + ((1 << i) - 1) <= this.rangeEnd;
        i++
      ) {
        list.push(this.rangeCurrent + ((1 << i) - 1));
      }
      if (list[list.length - 1] != this.rangeEnd) {
        list.push(this.rangeEnd);
      }

      for (
        let i = 1;
        this.rangeCurrent >= Number.MIN_SAFE_INTEGER + ((1 << i) - 1) &&
        this.rangeCurrent - ((1 << i) - 1) >= this.rangeStart;
        i++
      ) {
        list.unshift(this.rangeCurrent - ((1 << i) - 1));
      }
      if (list[0] != this.rangeStart) {
        list.unshift(this.rangeStart);
      }
      return {
        current: this.rangeCurrent,
        list,
        hasPrev: this.rangeCurrent !== this.rangeStart,
        hasNext: this.rangeCurrent !== this.rangeEnd,
      };
    } else {
      const list = [this.arrayIndex];
      for (
        let i = 1;
        this.arrayIndex <= Number.MAX_SAFE_INTEGER - ((1 << i) - 1) &&
        this.arrayIndex + ((1 << i) - 1) < this.arrayData.length;
        i++
      ) {
        list.push(this.arrayIndex + ((1 << i) - 1));
      }
      if (list[list.length - 1] != this.arrayData.length - 1) {
        list.push(this.arrayData.length - 1);
      }
      for (let i = 1; this.arrayIndex >= (1 << i) - 1; i++) {
        list.unshift(this.arrayIndex - ((1 << i) - 1));
      }
      if (list[0] != 0) {
        list.unshift(0);
      }
      return {
        current: this.arrayIndex,
        list,
        display: list.map((idx) => this.arrayData[idx]),
        hasPrev: this.arrayIndex != 0,
        hasNext: this.arrayIndex != this.arrayData.length - 1,
      };
    }
  }
  setArray(array: any[], idx: number) {
    if (!(array.length > 0)) {
      throw new Error(`array length should large than 0`);
    }
    if (!Number.isInteger(idx)) {
      throw new Error(`idx should be number`);
    }
    if (idx < 0 || idx >= array.length) {
      throw new Error("args should satisfy 0 <= idx < array.length");
    }
    this.mode = "array";
    this.arrayData = array;
    this.arrayIndex = idx;
    return this.current();
  }

  setRange(rStart: number, rEnd: number, rCur: number) {
    if (
      !Number.isInteger(rStart) ||
      !Number.isInteger(rEnd) ||
      !Number.isInteger(rCur)
    ) {
      throw new Error("args should be integer");
    }
    if (rCur < rStart || rCur > rEnd) {
      throw new Error("args should satisfy rStart <= rCur <= rEnd");
    }
    this.mode = "range";
    this.rangeStart = rStart;
    this.rangeEnd = rEnd;
    this.rangeCurrent = rCur;
    return this.current();
  }

  setRangeCurrent(rCur: number) {
    if (this.mode !== "range") {
      throw new Error(`current mode [${this.mode}] is not range`);
    }
    if (
      !Number.isInteger(rCur) ||
      rCur < this.rangeStart ||
      rCur > this.rangeEnd
    ) {
      throw new Error("wrong current value");
    }
    this.rangeCurrent = rCur;
    return this.current();
  }

  setArrayIndex(idx: number) {
    if (this.mode !== "array") {
      throw new Error(`current mode [${this.mode}] is not array`);
    }
    if (!Number.isInteger(idx) || idx < 0 || idx >= this.arrayData.length) {
      throw new Error("wrong index value");
    }
    this.arrayIndex = idx;
    return this.current();
  }
}

export { Pagination };
