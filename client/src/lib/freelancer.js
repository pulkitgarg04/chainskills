import { ethers } from "ethers";
import abi from "../constants/abi";
import { contractAddress } from "../constants/contractAddress";

export async function saveFreelancerProfile(profileData) {
  const { name, email, skills, hourlyRate, avail, bio } = profileData;

  if (!name || !email || !skills.length || !hourlyRate || !avail || !bio) {
    throw new Error("All fields are required to save the profile.");
  }

  if (!window.ethereum) {
    throw new Error("Ethereum provider is not available. Please install MetaMask.");
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const addr = accounts[0];
    const contract = new ethers.Contract(contractAddress, abi, addr);

    const tx = await contract.registerDev(
    addr,
      name,
      email,
      skills,
      avail,
      ethers.parseUnits(hourlyRate, "ether"),
      bio
    );


    await tx.wait();

    console.log("Freelancer profile saved successfully on blockchain and backend!");
  } catch (error) {
    console.error("Error saving freelancer profile:", error);
    throw error;
  }
}