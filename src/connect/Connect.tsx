import React, { useEffect, useState } from 'react'
import Line from '../../public/img/Connect/Line.svg'
type Props = {}

export default function Connect({}: Props) {
  const handleOpenLoginPage = () => {
    const loginTabURL = `https://fuseum.esollabs.com?extension-id=${chrome.runtime.id}`
    // const loginTabURL = `localhost:3000?extension-id=${chrome.runtime.id}`
    chrome.tabs.create({ url: loginTabURL })
  }
  const [suiWalletAddress, setSuiWalletAddress] = useState<string>('')
  useEffect(() => {
    chrome.storage.local.get('address', function (result) {
      if (result.address) {
        console.log('Stored address:', result.address)
        setSuiWalletAddress(result.address)
      } else {
        console.log('No address stored.')
      }
    })
    return () => {}
  }, [])
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center py-[32px]">
        <img src={Line} className="rotate-180" />
        <button
          onClick={handleOpenLoginPage}
          className="flex items-center justify-center whitespace-nowrap rounded-[32px] bg-[#67B6FF] px-6 py-2.5 font-DMMono text-base font-medium not-italic leading-[100%] text-[color:var(--Black,#140E24)]"
        >
          {suiWalletAddress == ''
            ? 'Connect Wallet'
            : `${suiWalletAddress.slice(0, 6)}...${suiWalletAddress.slice(suiWalletAddress.length - 4, suiWalletAddress.length)}`}
        </button>
        <img src={Line} />
      </div>
      <div className="flex flex-col items-center justify-center gap-3 self-stretch px-0 py-4">
        <p className=" font-IBMPlexMono text-[11px] font-normal not-italic leading-[100%] text-white">
          Powered by Esol Labs
        </p>
        <p className=" font-IBMPlexMono text-[11px] font-normal not-italic leading-[100%] text-white">
          Powered by SUI
        </p>
        <p className="text-[11px] font-normal not-italic leading-[100%] text-[#89A4BE]">
          Term Privacy
        </p>
      </div>
    </div>
  )
}
