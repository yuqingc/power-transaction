
function sum(a: number, b: number):number {
  return a + b;
}

it('should add',() => {
  expect(sum(1, 2)).toBe(3)
})