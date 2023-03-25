export default class ChatUtils {


  static changeHeight (mainId, textId, counterId) {
    let elem = document.getElementById(textId)
    let count = elem.innerText.length
    let counter = document.getElementById(counterId)

    if (count === 0) {
      counter.innerHTML = ''
    } else {
      counter.innerHTML = (200 - count).toFixed(0)
    }

    setTimeout(() => {
      //console.log('-'+elem.innerText+'-')
      if (elem.innerText === '') {
        elem.style.cssText = 'height:auto;';
        elem.style.cssText = 'height: 18px;'
        //return textareaHeight
        return
      }

      //textareaHeight = elem.scrollHeight
      elem.style.cssText = 'height:auto;';
      elem.style.cssText = 'height: ' + elem.scrollHeight + 'px;'

      if (Math.ceil(elem.scrollHeight/18) > 5) {
        elem.style.cssText = 'height:auto; padding: 0;';
        elem.style.cssText = 'height: ' + (5*18) + 'px;'
      }

      document.getElementById(mainId).scrollTo(0, document.getElementById(mainId).scrollHeight)
    }, 0)

    //return textareaHeight
  }
}
