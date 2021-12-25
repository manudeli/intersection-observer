const today = new Date()

const cardContainer = document.querySelector('.card-container')
const cards = document.querySelectorAll('.card')

const observer = new IntersectionObserver((entries) =>
  entries.forEach((entry) => {
    entry.target.classList.toggle('show', entry.isIntersecting)
    if (entry.isIntersecting) observer.unobserve(entry.target)
  })
)

cards.forEach((card) => observer.observe(card))

initEndCardObserver('.card:last-child')
initEndCardObserver('.card:first-child')

function initEndCardObserver(selectors) {
  const targetObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    switch (selectors) {
      case '.card:last-child':
        newCard.append()
        break
      case '.card:first-child':
        newCard.prepend()
        break
      default:
        newCard.prepend()
        break
    }
    targetObserver.unobserve(entry.target)
    targetObserver.observe(document.querySelector(selectors))
  }, {})
  targetObserver.observe(document.querySelector(selectors))
  return targetObserver
}

const newCard = {
  prepend: () => {
    const newCardDate = getDate(-getDistance.prevWithToday(), today)
    const card = createElement('div', 'card', newCardDate.toLocaleDateString())
    observer.observe(card)
    cardContainer.prepend(card)
  },
  append: () => {
    const newCardDate = getDate(getDistance.nextWithToday(), today)
    const card = createElement('div', 'card', newCardDate.toLocaleDateString())
    observer.observe(card)
    cardContainer.append(card)
  },
}

const createElement = (tagName, className, textContent) => {
  const card = document.createElement(tagName)
  card.textContent = textContent
  card.classList.add(className)
  return card
}

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
