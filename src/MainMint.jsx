import React,{useState} from 'react'
import { ethers,BigNumber } from 'ethers'
import roboPunksNFT from './RoboPunksNFT.json';
import { Box,Button,Flex,Input,Text } from '@chakra-ui/react'
const roboPunksNFTAddress  = "0xeC97EF2bD53d3DD0d736a7591c39DFb7bF99a455"

const MainMint = ({accounts, setAccounts})=>{
const [mintAmount,setMintAmount] = useState(1)
const isConnected = Boolean(accounts[0])

async function handleMint(){
    if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
            roboPunksNFTAddress,
            roboPunksNFT.abi,
            signer
        );
        try {
            const response = await contract.mint(BigNumber.from(mintAmount), {
                value: ethers.utils.parseEther((0.02 * mintAmount).toString())
            })
            console.log("response: ", response)
        } catch (err) {
            console.log("error: ",err)

        }
    }
}
   const handleDecrement =()=>{
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1)
}
const handleIncrement =()=>{
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1)
}

 return(
    <Flex justify="center" align="center" height="100vh" paddingButton="150px">
        <Box width="520px">
        <div>  
        <Text fontSize="48px" textShadow="0 5px #000000">RoboPunks</Text>
        <Text 
        fontSize="30px"
        letterSpacing = "-5.5%"
        fontFamily = "Kdam Thmor Pro"
        textShadow = "0 2px 2px #000000"
        >Its 2078. Can the RoboPunks NFT save humans from destructive rampant NFT speculation mint RoboPunks to find out

        </Text>
         </div>
        {isConnected ? (
            <div>
                <Flex align="center" justify="center">
                    <Button
                    backgroundColor="#D6517D"
                    borderRadius= "5px"
                    boxShadow="0px 2px 2px 1px #0f0f0f"
                    color = "white"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="15px"
                    marginTop="10px"
                     onClick={handleDecrement}>-</Button>
                    <Input
                    readOnly
                    fontFamily="inherit"
                    width="100px"
                    height="40px"
                    textAlign="center"
                    paddingLeft="10px"
                    type="number"
                     value={mintAmount} />
                    <Button 
                      backgroundColor="#D6517D"
                      borderRadius= "5px"
                      boxShadow="0px 2px 2px 1px #0f0f0f"
                      color = "white"
                      cursor="pointer"
                      fontFamily="inherit"
                      padding="15px"
                      marginTop="10px"
                    onClick={handleIncrement}>+</Button>

                </Flex>
                <Button 
                      backgroundColor="#D6517D"
                      borderRadius= "5px"
                      boxShadow="0px 2px 2px 1px #0f0f0f"
                      color = "white"
                      cursor="pointer"
                      fontFamily="inherit"
                      padding="15px"
                      marginTop="10px"
                    onClick={handleMint}>MINT NOW</Button>
            </div>
        ) : (
            <Text 
            marginTop="70px"
            fontSize = "30px"
            letterSpacing = "-5.5p%"
            fontFamily= "VT323"
            textShadow = "0 3px #000000"
            color = "#D6517d"
            >You must be Connected to Mint</Text>
        ) }
        </Box>
    </Flex>   
 )
}
export default MainMint