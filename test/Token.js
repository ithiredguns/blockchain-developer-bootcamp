const { ethers } = require('hardhat');
const {expect} = require('chai');

const tokens= (n) => {
    return ethers.utils.parseUnits(n.toString(),'ether');
}

describe('Token',()=>{  
    
    let token

    beforeEach(async ()=>{
        const Token = await ethers.getContractFactory('Token');        
        token = await Token.deploy('Dapp University','DAPP',1000000); 
    });
    
    describe('Deployment', ()=> {
        const name = 'Dapp University';
        const symbol = 'DAPP';
        const decimals = 18;
        const totalSupply= tokens('1000000');
        it('Has correct name',async ()=>{ 
            expect(await token.name()).to.equals(name);
            console.log(); 
        });

        it('Has correct symbol',async ()=>{ 
            expect(await token.symbol()).to.equals(symbol);
            console.log();

        });
        it('Has correct decimals',async ()=>{ 
            expect(await token.decimals()).to.equals(decimals);
            console.log();

        });
        it('Has correct total supply',async ()=>{  
            expect(await token.totalSupply()).to.equals(totalSupply);
            console.log();

        });

    });

});