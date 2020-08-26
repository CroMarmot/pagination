"use strict";
let expect = require("chai").expect;

const { Pagination } = require("../dist/index.js");

describe("default", () => {
  const pm = new Pagination();
  it("current()", () => {
    // deep equal
    expect(pm.current()).to.eql({
      current: 1,
      list: [1],
      hasNext: false,
      hasPrev: false,
    });
  });
});

describe("set", () => {
  const pm = new Pagination();
  it("setRange(1,100,1)", () => {
    // deep equal
    expect(pm.setRange(1, 100, 1)).to.eql({
      current: 1,
      list: [1, 2, 4, 8, 16, 32, 64, 100],
      hasPrev: false,
      hasNext: true,
    });
  });
  it("setArray()", () => {
    // deep equal
    expect(pm.setArray([61, 41, 523, 4, 56, 26], 0)).to.eql({
      current: 0,
      list: [0, 1, 3, 5],
      display: [61, 41, 4, 26],
      hasNext: true,
      hasPrev: false,
    });
  });
});
describe("set", () => {
  const pm = new Pagination();
  it("setRangeCurrent()", () => {
    pm.setRange(1, 100, 1);
    // deep equal
    expect(pm.setRangeCurrent(10)).to.eql({
      current: 10,
      list: [1, 3, 7, 9, 10, 11, 13, 17, 25, 41, 73, 100],
      hasPrev: true,
      hasNext: true,
    });
  });
  it("setArrayIndex()", () => {
    pm.setArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4], 0);
    // deep equal
    expect(pm.setArrayIndex(5)).to.eql({
      current: 5,
      list: [0, 2, 4, 5, 6, 8, 12, 13],
      display: [9, 7, 5, 4, 3, 1, -3, -4],
      hasNext: true,
      hasPrev: true,
    });
  });
});
