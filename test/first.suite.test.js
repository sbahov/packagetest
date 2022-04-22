const chai = require('chai');
const expect = chai.expect;

describe('first test suite', function () {
  it('should pass (p1_priority)', async function () {
    expect(true).to.equal(true);
  });
  it('should fail (p2_priority)', async function () {
    expect(true).to.equal(false);
  });
});
