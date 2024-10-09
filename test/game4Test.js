const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const [signer, acc1, acc2, acc3] = await ethers.getSigners();
    const address = await signer.getAddress();
    const address1 = await acc1.getAddress();

    console.log("Signer Address:", address);
    console.log("Account1 Address:", address1);

    return { game, address, address1, acc1};
  }
  it('should be a winner', async function () {
    const { game, address, address1, acc1 } = await loadFixture(deployContractAndSetVariables);

    //console.log('acc1 is: ', acc1);
    
    // nested mappings are rough :}
    await game.write(address1);
    await game.connect(acc1).win(address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
