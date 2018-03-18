const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
let rangeFlag = false
let scrubFlag = false

const togglePlay = () => video.paused ? video.play() : video.pause()

const handleRangeUpdate = function () {
  if(rangeFlag) video[this.name] = this.value
}

const updateButton = function () {
  toggle.textContent = this.paused ? '►' : '❚ ❚'
}

const handleProgress = () => {
  progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`
}

const scrub = function(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
progress.addEventListener('mousedown', () => scrubFlag = !scrubFlag)
progress.addEventListener('mouseup', () => scrubFlag = !scrubFlag)
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => scrubFlag && scrub(e))
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', () => video.currentTime += Number(button.dataset.skip)))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousedown', () => rangeFlag = !rangeFlag))
ranges.forEach(range => range.addEventListener('mouseup', () => rangeFlag = !rangeFlag))
