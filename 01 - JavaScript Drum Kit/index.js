function init () {
  const keys = document.querySelectorAll('.key')
  keys.forEach(key => key.addEventListener('transitionend', removePlayingClass))

  function removePlayingClass (e) {
    if (e.propertyName !== 'transform') return
    this.classList.remove('playing')
  }

  function playSound (e) {
    const audioElem = document.querySelector(`audio[data-key="${e.keyCode}"]`)
        , keyElem = document.querySelector(`.key[data-key="${e.keyCode}"]`)

    if (!audioElem) return false

    audioElem.currentTime = 0
    audioElem.play()

    keyElem.classList.add('playing')
  }

  window.addEventListener('keydown', playSound)
}

init()
