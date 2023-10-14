import React, {useState, useEffect} from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client'

import { MarketAddress, MarketAddressABI } from './constants';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setcurrentAccount] = useState('');
  const nftCurrency = 'ETH';

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if(accounts.length) {
      setcurrentAccount(accounts[0]);
    } else {
      console.log('no accounts found');
    }

    console.log({ accounts });
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setcurrentAccount(accounts[0]);

    window.location.reload();
  };

  const uploadToIPFS = async (file, setFileUrl) => {
    try {
      const added = await client.add({ content: file});

      const url = `https://ipfs.infura.io:ipfs${added.path}`;

      return url;
    }  catch (error) {
      console.log('Error uploading file to IPFS');
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS }}>
      {children}
    </NFTContext.Provider>
  );
};
