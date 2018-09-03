const emoji = [
  '🍌',
  '🍍',
  '🥥',
  '🍊',
  '🍑',
  '🥝',
  '🥑',
  '🍉',
  '🍒',
  '🍋',
  '🍎',
  '🇵🇷'
]

let isPainting = false

function getRandomEmoji () {
  const index = Math.floor(
    Math.random() * emoji.length
  )
  return emoji[index]
}

function throttle (fn, wait) {
  let lastCalled = null

  return function throttledFn () {
    const now = Date.now()
    if (lastCalled === null || (now - lastCalled) >= wait) {
      fn.apply(null, arguments)
      lastCalled = now
    }
  }
}

const paintEmoji = throttle(function paintEmoji (x, y) {
  const node = document.createElement('span')
  node.classList.add('emoji')
  node.innerHTML = getRandomEmoji()
  node.style.left = x
  node.style.top = y
  document.body.appendChild(node)

  // Center node once we know its width and height
  node.style.left = Math.ceil(x - (node.clientWidth / 2))
  node.style.top = Math.ceil(y - (node.clientHeight / 2))

  setTimeout(() => {
    node.style.animationName = 'popOut'
    setTimeout(() => {
      document.body.removeChild(node)
    }, 250)
  }, 750)
}, 100)

function canPaintInTag (tagName) {
  const tagNameBlackList = [
    'h1',
    'h2',
    'p',
    'li',
    'a',
  ]

  return tagNameBlackList.indexOf(tagName) < 0
}

function startPainting () {
  isPainting = true
}

function stopPainting () {
  isPainting = false
}

document.body.addEventListener('mousedown', event => {
  paintEmoji(event.clientX, event.clientY)

  const tagName = event.target.tagName.toLowerCase()
  if (canPaintInTag(tagName)) {
    startPainting()
  }
})

document.body.addEventListener('mousemove', event => {
  if (!isPainting) {
    return
  }

  // Prevent text from being selected while the user is painting
  event.preventDefault()
  paintEmoji(event.clientX, event.clientY)
})

document.body.addEventListener('mouseup', () => {
  stopPainting()
})
