const { ethers } = require('hardhat');
const {expect} = require('chai');

const tokens= (n) => {
    return ethers.utils.parseUnits(n.toString(),'ether');
}

describe('Token',()=>{  
    
    let token, accounts, deployer,receiver , exchange;

    beforeEach( async ()=>{
        const Token = await ethers.getContractFactory('Token');        
        token = await Token.deploy('Dapp University','DAPP',1000000); 
         accounts = await ethers.getSigners();
         deployer = accounts[0];
         receiver = accounts[1];
         exchange = accounts[2];
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
        it('assign total supply to sender',async ()=>{  
            //console.log(deployer);
            expect(await token.balanceOf(deployer.address)).to.equals(totalSupply);
            console.log();

        });

    });
    describe('Sending Tokens',()=>{
        let amount, transaction, result ;
        
        describe('Success', ()=>{
            beforeEach(async()=>{
                amount = tokens(100);
                transaction = await token.connect(deployer).transfer(receiver.address,amount);
                result = await transaction.wait();
    
            });
    
            it('transfers token balances',async()=>{ 
                expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900));
                expect(await token.balanceOf(receiver.address)).to.equal(amount);
            });
    
            it('emits a Transfer event', async() => {
                const event = result.events[0];
              // console.log(event);
                expect(event.event).to.equal('Transfer');
                const args = event.args;
                expect(args.from).to.equal(deployer.address);
                expect(args.to).to.equal(receiver.address);
                expect(args.value).to.equal(amount);
            });
        });
        
        describe('Failure',()=> {
            it('rejects insufficient balances', async()=> {
                //Transfer more tokens than deployer has - 100 M
              const invalidAmount =   tokens(100000000);
              await expect(token.connect(deployer).transfer(receiver.address,invalidAmount)).to.be.reverted;

            });
            it('rejects invalid receipient', async()=> {
                //Transfer more tokens than deployer has - 100 M
              const invalidAmount =   tokens(100000000);
              await expect(token.connect(deployer).transfer('0x0000000000000000000000000000000000000000',invalidAmount)).to.be.reverted;

            });

        });

    });
    describe('Approving Tokens',()=> {
        let amount, transaction,result

        beforeEach(async()=>{
            amount = tokens(100);
            transaction = await token.connect(deployer).approve(exchange.address,amount);
            result = await transaction.wait();
        });
        describe('Success',()=>{
            it('allocates an allowance for delegated token spending',async()=>{
                expect(await token.allowance(deployer.address,exchange.address)).to.equal(amount);
            });
            it('emits a Approval event', async() => {
                const event = result.events[0];
              // console.log(event);
                expect(event.event).to.equal('Approval');
                const args = event.args;
                expect(args.owner).to.equal(deployer.address);
                expect(args.spender).to.equal(exchange.address);
                expect(args.value).to.equal(amount);
            });
        });
        describe('Failure', ()=>{
            it('rejects invalid spenders', async()=> {
                
                await expect(token.connect(deployer).approve('0x0000000000000000000000000000000000000000',amount)).to.be.reverted;
            });
        });

    });


});