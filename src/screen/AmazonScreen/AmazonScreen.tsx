import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { OriginExtract } from '@src/utils/lib'
import DisStepHeader from './DisableStepHeader'
import AmazonCardStep from '@src/components/AmazonCard/AmazonCardStep'
import QRCode from 'react-qr-code'
import AmazonFooter from './AmazonFooter'

export default function AmazonScreen() {
  const [searchParams] = useSearchParams()
  const senderInfo = JSON.parse(searchParams.get('senderInfo'))
  const senderOrigin = OriginExtract(senderInfo.origin)
  const senderTabID = senderInfo.tab.id

  console.log('sender info found:', senderInfo)

  const [step, setStep] = useState(1)
  /* for showing | hiding steps */
  const [showStep, setShowStep] = useState([true, false, false, false])
  /* for step completion (completed or not) */
  const [stepStatus, setStepStatus] = useState([true, false, false, false])
  /* for step process (loading or done) */
  const [stepLoading, setStepLoading] = useState([true, true, true, true])

  let ref = useRef(null)

  useEffect(() => {
    /* Check for payment status */
    TrackPaymentProcess()

    console.log('document location: ', document.location)
  }, [])

  const TrackPaymentProcess = async () => {
    try {
      let paymentStatus = 0
      console.log('payment Status: ', paymentStatus)

      /* if payment is validated -> simulate step 2 */
      changeStepStatus(setStepLoading, 1, false)

      setTimeout(async () => {
        await simulateStep2()
      }, 10000)
    } catch (error) {
      console.log('payment error: ', error)
    }
  }

  const changeStepStatus = (statusArray, step, value) => {
    statusArray((prevStatus) => {
      var tempStatus = [...prevStatus]
      tempStatus[step - 1] = value
      return tempStatus
    })
  }

  const simulateStep2 = async () => {
    setStep(2)
    changeStepStatus(setShowStep, 2, true)

    setTimeout(async () => {
      changeStepStatus(setStepLoading, 2, false)
      changeStepStatus(setStepStatus, 2, true)

      setTimeout(() => {
        simulateStep3()
      }, 4000)
    }, 4000)
  }

  const simulateStep3 = async () => {
    setStep(3)
    changeStepStatus(setShowStep, 3, true)
    /* send code to background */
    chrome.runtime.sendMessage(
      {
        action: 'applyGiftCard',
        data: 'G6HA-IJ5K-LYUV-WZ14-DQ0R',
        senderOrigin: senderOrigin,
        senderTabId: senderTabID,
      },
      (response) => {
        console.log('response from background is: ', response)
        if (response.success) {
          changeStepStatus(setStepLoading, 3, false)
          changeStepStatus(setStepStatus, 3, true)
          setTimeout(() => {
            simulateStep4()
          }, 4000)
        }
      }
    )
  }

  const simulateStep4 = async () => {
    setStep(4)
    changeStepStatus(setShowStep, 4, true)
    chrome.runtime.sendMessage(
      {
        action: 'placeOrder',
        senderTabId: senderTabID,
      },
      (response) => {
        console.log('response from background is: ', response)
        if (response.success) {
          setTimeout(() => {
            changeStepStatus(setStepLoading, 4, false)
            changeStepStatus(setStepStatus, 4, true)
          }, 4000)
        }
      }
    )
  }

  return (
    <div className="overflow-hidden h-[520px] w-[320px] bg-[#060B1B] bg-cover bg-no-repeat  text-[#FFF] flex flex-col  justify-start items-center font-monasans m-0">
      {/* step 1 */}
      <div className="h-[400px] no-scrollbar overflow-x-hidden overflow-y-scroll flex flex-col items-center justify-between w-full gap-4 relative z-10 pr-[12px] pl-[8px] pt-[24px]">
        {step === 1 ? (
          <>
            <AmazonCardStep
              step={1}
              title={'Deposit Required USDC'}
              stepLoading={stepLoading}
              currentref={ref}
            />
          </>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[0]) setStep(1)
            }}
          >
            <DisStepHeader done={stepStatus[0]} step={1} title={'Deposit Required USDC'} />
          </button>
        )}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
        {/* step 2 */}
        {step === 2 ? (
          <div className="w-full">
            <AmazonCardStep
              step={2}
              title={`Convert to ${senderOrigin} Balance`}
              stepLoading={stepLoading}
              currentref={ref}
              senderOrigin={senderOrigin}
            />
          </div>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[1]) setStep(2)
            }}
          >
            <DisStepHeader
              done={stepStatus[1]}
              step={2}
              title={`Convert to ${senderOrigin} Balance`}
            />
          </button>
        )}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
        {/* step 3 */}
        {step === 3 ? (
          <div className="w-full">
            <AmazonCardStep
              step={3}
              title={'Apply Card for Payment'}
              stepLoading={stepLoading}
              currentref={ref}
            />
          </div>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[2]) setStep(3)
            }}
          >
            <DisStepHeader done={stepStatus[2]} step={3} title={'Apply Card for Payment'} />
          </button>
        )}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
        {/* step 4 */}
        {step === 4 ? (
          <div className="w-full">
            <AmazonCardStep
              step={4}
              title={'Place Order'}
              stepLoading={stepLoading}
              currentref={ref}
            />
          </div>
        ) : (
          <button
            className="w-full "
            onClick={() => {
              if (showStep[3]) setStep(4)
            }}
          >
            <DisStepHeader done={stepStatus[3]} step={4} title={'Place Order'} />
          </button>
        )}
        {/* end part */}
        {/* <div className="ml-3 h-4 border-l border-[#bdbdbd]"></div> */}
        {!stepLoading[3] && (
          <div className="w-full flex flex-col items-center text-center gap-[10px]">
            <div className="text-[#FFFFFF] text-[16px] leading-[16px] font-medium">
              Thanks for using our service!
            </div>
            <div className=" text-[14px] leading-[14px] font-light text-[#CECBCF]">
              This window can now be closed.
            </div>
          </div>
        )}
      </div>
      <div className="">
        <AmazonFooter />
      </div>
    </div>
  )
}
