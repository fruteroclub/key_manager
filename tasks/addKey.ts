import { EncryptionTypes } from "fhenixjs";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:addKey")
    //.addParam("keyManaged", "Private key to use for the task")
    .setAction(async function (taskArguments, hre) {
        const { fhenixjs, ethers, deployments } = hre;
        const [signer] = await ethers.getSigners();
    
        if ((await ethers.provider.getBalance(signer.address)).toString() === "0") {
        await fhenixjs.getFunds(signer.address);
        }
    
        const key = 60442; // taskArguments.key;
        const Key_Manager = await deployments.get("Key_Manager");

        console.log(
        `Running addKey (${key}), targeting contract at: ${Key_Manager.address}`,
        );
    
        const contract = await ethers.getContractAt("Key_Manager", Key_Manager.address);

        const encyrptedKey = await fhenixjs.encrypt(key, EncryptionTypes.uint32);
        //console.log(`Encrypted key: ${encyrptedKey.data}`);
        let contractWithSigner = contract.connect(signer) as unknown as any;

        try {
            // add() gets `bytes calldata encryptedValue`
            // therefore we need to pass in the `data` property
            console.log("Signer address: ", signer.address);
            await contractWithSigner.add_key(signer.address, encyrptedKey);
        } catch (e) {
            console.log(`Failed to send add transaction: ${e}`);
            return;
        }
    });