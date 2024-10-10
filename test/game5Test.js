const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    //const signers = await ethers.getSigners();  // Get the list of available signers

    // Create a wallet with an address that starts with 0x00
    let wallet;
    while (true) {
      wallet = ethers.Wallet.createRandom().connect(ethers.provider);
      if (wallet.address.slice(0, 4).toLowerCase() === '0x00') {
        break;
      }
    }
    
    // Get some ETH to the wallet to pay for gas
    const signer = await ethers.provider.getSigner();
    await signer.sendTransaction({
      to: wallet.address,
      value: ethers.parseEther('1'),
    });

   
    return { game,wallet };
  }

  it('should be a winner', async function () {
    const { game, wallet } = await loadFixture(deployContractAndSetVariables);
   
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
