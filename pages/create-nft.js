import React from 'react';
import { useState, useMemo, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { NFTContext } from '../context/NFTContext';
import { Button } from '../components';
import images from '../assets';
import { Input } from '../components';

const CreateNFT = () => {
  const [formInput, setFormInput] = useState({ price: '', name: '', description: '' })
  const [fileUrl, setFileUrl] = useState(null);
  const { theme } = useTheme();
  const { uploadToIPFS } = useContext(NFTContext);

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);

    console.log(url);

    setFileUrl(url);
  }, []);

  const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const fileStyle = useMemo(() => (
    `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive && 'border-file-active'} 
    ${isDragAccept && 'border-file-accept'}
    ${isDragReject && 'border-file-reject'}`
  ), [isDragActive, isDragAccept, isDragReject]);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Create New Nft</h1>

        <div className="mt-16">
          <p className="font-semibold text-xl font-poppins dark:text-white text-nft-black-1">Upload File</p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flex-center flex-col text-center">
                <p className="font-semibold text-xl font-poppins dark:text-white text-nft-black-1">JPG, PNG, GIF, SVG, WEBM. max 100 mb.</p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file uploud"
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>
                <p className="font-semibold text-sm font-poppins dark:text-white text-nft-black-1">Drag and Drop file</p>
                <p className="font-semibold text-sm font-poppins dark:text-white text-nft-black-1 mt-2">or Browse media on your device</p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="Item Name"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          handleClick={(e) => setFormInput({ ...formInput, description: e.target.value })}
        />
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setFormInput({ ...formInput, price: e.target.value })}
        />
        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="Create NFT"
            className="rounded-xl"
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
