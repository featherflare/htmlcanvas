import { randomIntFromRange, randomColor, distance } from './utils.js'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
let mouseDown = false
addEventListener('mousedown', (event) => {
  mouseDown = true
})

addEventListener('mouseup', (event) => {
  mouseDown = false
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.shadowColor = this.color
    c.shadowBlur = 15
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

// Implementation
let particles
function init() {
  particles = []

  const particlesCount = 800

  for (let i = 0; i < particlesCount; i++) {
    const canvasWidth = canvas.width + 300
    const canvasHeight = canvas.height + 300
    const radian = (2 * Math.PI) / particlesCount

    const x = canvasWidth * Math.random() - canvasWidth / 2
    const y = canvasWidth * Math.random() - canvasWidth / 2
    const radius = Math.random() * 2 + 1
    const color = colors[Math.floor(Math.random() * colors.length)]
    particles.push(
      new Particle(x, y, radius, color, {
        x: Math.cos(radian),
        y: Math.sin(radian),
      })
    )
  }
}

// Animation Loop
let radians = 0
let alpha = 1
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(10,10,10,${alpha})`
  c.fillRect(0, 0, canvas.width, canvas.height)

  c.save()
  c.translate(canvas.width / 2, canvas.height / 2)
  c.rotate(radians)
  particles.forEach((particle) => {
    particle.update()
  })
  c.restore()

  radians += 0.001
  if (mouseDown) {
    radians += 0.01
    if (alpha >= 0.1) {
      alpha -= 0.01
    }
  } else if (!mouseDown && alpha < 1) {
    alpha += 0.01
  }
}

init()
animate()
