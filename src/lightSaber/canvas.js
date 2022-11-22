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
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX - canvas.width / 2
  mouse.y = event.clientY - canvas.height / 2

  angle = Math.atan2(mouse.y, mouse.x)
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

const center = {
  x: canvas.width / 2,
  y: canvas.height / 2,
}

let angle = 0

// Objects
class Particle {
  constructor(x, y, radius, color, distanceFromcenter) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.distanceFromcenter = distanceFromcenter
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update(timer) {
    this.draw()

    const { cos, sin } = Math
    const { distanceFromcenter } = this

    this.x =
      center.x +
      distanceFromcenter *
        cos(-angle) *
        sin(timer + distanceFromcenter) *
        cos(timer + distanceFromcenter)
    this.y =
      center.y +
      distanceFromcenter *
        sin(-angle) *
        cos(timer + distanceFromcenter) *
        cos(timer)
  }
}

// Implementation
let particles
function init() {
  particles = []

  const particleCount = 200
  const hueIncrement = 360 / particleCount
  const baseRadius = 3
  const radiusIncrement = baseRadius / particleCount

  for (let i = 0; i < particleCount; i++) {
    const x = canvas.width / 2 + i * Math.cos(Math.PI)
    const y = canvas.height / 2 + i * Math.sin(-Math.PI)
    particles.push(
      new Particle(x, y, baseRadius, `hsl(${hueIncrement * i},50%,50%)`, i)
    )
  }
}

// Animation Loop
let timer = 0
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0,0,0,0.1)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle) => {
    particle.update(timer)
  })

  timer += 0.001
}

init()
animate()
