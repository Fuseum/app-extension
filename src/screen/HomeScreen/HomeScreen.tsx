import LineLeft from '@assets/images/Amazon/lineLeft.svg'
import LineRight from '@assets/images/Amazon/lineRight.svg'
import AmazonFooter from '@src/components/AmazonFooter'
import { useEffect, useRef, useState } from 'react'
import { LocalStorage } from '@src/utils/localStorage'
import { walletFormatAddress } from '@src/utils/lib'
export default function HomeScreen() {
  const addRef = useRef(null)
  const [address, setAddress] = useState<any>(null)
  const openLoginTab = () => {
    const loginTabURL = 'https://paylana.esollabs.com/'
    chrome.tabs.create({ url: loginTabURL })
  }

  const logout = async () => {
    await chrome.storage.local.clear().then((result) => retrieveAddress())
  }

  const retrieveAddress = async () => {
    const addressStorage = await LocalStorage.getSolanaAddress()
    console.log('address get: ', addressStorage)
    if (addressStorage) {
      setAddress(addressStorage)
    } else setAddress(null)
  }

  useEffect(() => {
    retrieveAddress()
  }, [])

  return (
    <div className="flex flex-col w-[320px] bg-[url('../../assets/images/Amazon/bg.png')] bg-cover bg-no-repeat font-DmMono">
      <div className="py-[32px] flex items-center">
        <img src={LineLeft} className="w-[68px]" alt="line left" />

        {address !== null ? (
          <button
            className="w-[184px] text-black text-[16px] leading-[16px] font-medium rounded-[32px] bg-[#36F181] py-[10px] text-center px-[24px]"
            onClick={() => logout()}
          >
            {walletFormatAddress({ address: address })}
          </button>
        ) : (
          <button
            className="w-[184px] text-black text-[16px] leading-[16px] font-medium rounded-[32px] bg-[#36F181] py-[10px] text-center px-[24px]"
            onClick={openLoginTab}
          >
            Connect Wallet
          </button>
        )}

        <img src={LineRight} className="w-[68px]" alt="line right" />
      </div>
      <AmazonFooter />
    </div>
  )
}
