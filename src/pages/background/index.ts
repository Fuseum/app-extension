import { LocalStorage } from '@src/utils/localStorage'
import { createPopupWindow } from '@src/utils/popUpOpener'
import EventEmitter from 'eventemitter3'

const backgroundEventBroadcast = new EventEmitter()

/* Internal extension communication */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('request : ', request.solanaAddress)
  console.log('Background script from Extension')
  if (request.solanaAddress) {
    console.log('Solana Address :', request.solanaAddress)
    LocalStorage.setSolanaAddress(request.solanaAddress)
  }
  switch (request.action) {
    case 'openQR': {
      createPopupWindow(
        '/amazon_checkout',
        336,
        560,
      {
        senderInfo: JSON.stringify(sender),
        signInfo: JSON.stringify(request.params)
      })
      break
    }
    /* TODO: handle tab closed mid transaction case*/
    case 'applyGiftCard': {
      chrome.tabs.sendMessage(
        request.senderTabId,
        {
          requestOrigin:request.senderOrigin,
          action: 'applyGiftCard',
          data: request.data,
        },
        function (response) {
          if (response && response.action === 'confirmApply') {
            sendResponse({
              success: true,
            })
          }
        }
      )
      break
    }
    case 'placeOrder': {
      chrome.tabs.sendMessage(
        request.senderTabId,
        {
          action: 'placeOrder',
        },
        function (response) {
          if (response && response.action === 'confirmPlaceOrder') {
            sendResponse({
              success: true,
            })
          }
        }
      )
      break
    }
    case 'confirmApply': {
      backgroundEventBroadcast.emit('done_apply')
      break
    }
    default:
      break
  }
  /* return true for asynchronous responses */
  return true
})

/* External extension communication */
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse)=>{
  console.log("external request is: ", request)
  switch(request.action){
    case "login":{
      LocalStorage.setToken(request.token)
      LocalStorage.setSolanaAddress(request.address)
      createPopupWindow(
        '/done',
        336,
        266,
      {
        senderInfo: JSON.stringify(sender),
        signInfo: JSON.stringify(request.params)
      })
      break
      break
    }
  }
})