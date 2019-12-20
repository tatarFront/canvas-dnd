import { compareArrays, randomInteger } from '../tools';

describe('>>> Tools', () => {
  describe('>>> compareArrays', () => {
    it('>>> should return true/false for compares two arrays', () => {
      const test1 = [1, 2, 3];
      const test2 = [1, 2, 3];
      const test3 = [1, 2, 0];
      const test4 = [1, 2, 3, 0];

      expect(compareArrays(test1, test2)).toBe(true);
      expect(compareArrays(test1, test3)).toBe(false);
      expect(compareArrays(test1, test4)).toBe(false);
    });
  });

  describe('>>> randomInteger', () => {
    it('>>> should return random number but less than max and more than min', () => {
      const testResult = randomInteger(100, 300);

      expect(testResult).toBeLessThanOrEqual(300);
      expect(testResult).toBeGreaterThan(100);
    });
  });
});
