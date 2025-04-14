
let signer;
let contract;

// استخدم ABI الذي تم الحصول عليه من العقد
const contractABI = [
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// استبدال عنوان العقد الحقيقي
const contractAddress = "0x34c96512F41C75315ca40cA8b8ed8725f7BAF638";

async function connectWallet() {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        const address = await signer.getAddress();
        document.getElementById("walletAddress").innerText = "Connected: " + address;
        contract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        alert("Please install MetaMask!");
    }
}

async function pauseContract() {
    if (!contract) return alert("Connect wallet first");
    await contract.pause();
    alert("Contract Paused");
}

async function unpauseContract() {
    if (!contract) return alert("Connect wallet first");
    await contract.unpause();
    alert("Contract Unpaused");
}

async function burnTokens() {
    if (!contract) return alert("Connect wallet first");
    const amount = prompt("Enter amount to burn:");
    await contract.burn(ethers.utils.parseUnits(amount, 18));
    alert("Tokens burned");
}

async function transferOwnership() {
    if (!contract) return alert("Connect wallet first");
    const newOwner = prompt("Enter new owner's address:");
    await contract.transferOwnership(newOwner);
    alert("Ownership Transferred");
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
