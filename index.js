const today = new Date()

const cardContainer = document.querySelector('.card-container')
const cards = document.querySelectorAll('.card')

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      entry.target.classList.toggle('show', entry.isIntersecting)
      if (entry.isIntersecting) observer.unobserve(entry.target)
    }),
  { threshold: 0 }
)

cards.forEach((card) => observer.observe(card))

const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0]
  if (!lastCard.isIntersecting) return
  appendNewCards()
  lastCardObserver.unobserve(lastCard.target)
  lastCardObserver.observe(document.querySelector('.card:last-child'))
}, {})
lastCardObserver.observe(document.querySelector('.card:last-child'))

const firstCardObserver = new IntersectionObserver(
  (entries) => {
    const firstCard = entries[0]
    if (!firstCard.isIntersecting) return
    prependNewCards()
    firstCardObserver.unobserve(firstCard.target)
    firstCardObserver.observe(document.querySelector('.card:first-child'))
  },
  { threshold: 0 }
)
firstCardObserver.observe(document.querySelector('.card:first-child'))

function prependNewCards() {
  const newCardDate = getDate(-getDistance.prevWithToday(), today)
  const card = createElement('div', 'card', newCardDate.toLocaleDateString())
  observer.observe(card)
  cardContainer.prepend(card)
}

function appendNewCards() {
  const newCardDate = getDate(getDistance.nextWithToday(), today)
  const card = createElement('div', 'card', newCardDate.toLocaleDateString())
  observer.observe(card)
  cardContainer.append(card)
}

function createElement(tagName, className, textContent) {
  const card = document.createElement(tagName)
  card.textContent = textContent
  card.classList.add(className)
  return card
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const getDate = (dateOffset, refDate) => {
  const targetDate = new Date(refDate)
  targetDate.setDate(refDate.getDate() + dateOffset)
  return targetDate
}

const getDistance = {
  prevWithToday: () => getIndexToday() + 1,
  nextWithToday: () => getCurrentCards().length - getIndexToday(),
}
const getCurrentCards = () => document.querySelectorAll('.card')
const getIndexToday = () =>
  Array.from(getCurrentCards()).findIndex((card) => card.id === 'today')
