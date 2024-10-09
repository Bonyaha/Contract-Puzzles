const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const [signer, acc1, acc2, acc3] = await ethers.getSigners();

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address1 = await acc1.getAddress();
    const address2 = await acc2.getAddress();
    const address3 = await acc3.getAddress();


    return { game, signer,acc1,acc2,acc3,address1,address2,address3 };
  }

  it('should be a winner', async function () {
    const { game, signer,acc1,acc2,acc3,address1,address2,address3 } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    await game.connect(acc1).buy({ value: ethers.parseEther("1") });
    await game.connect(acc2).buy({ value: ethers.parseEther("2") });
    await game.connect(acc3).buy({ value: ethers.parseEther("0.5") });


    // TODO: win expects three arguments
    await game.win(address1,address2,address3);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
