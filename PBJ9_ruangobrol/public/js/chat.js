const socket = io()

// Elements
const $messageForm = document.querySelector('#form-pesan')
const $messageFormInput = document.querySelector('input')
const $messageFormButton = document.querySelector('button')
const $sendLocationButton = document.querySelector('#kirim-lokasi')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#locationMessage-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

// Auto scroll functionality
const autoScroll = () => {
  // New message element
  const $newMessage = $messages.lastElementChild

  // Height of the new message
  const newMessageStyles = getComputedStyle($newMessage)
  const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

  // Visible Height
  const visibleHeight = $messages.offsetHeight

  // Height of messages container
  const containerHeight = $messages.scrollHeight

  // How far have I scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight

  // If we are at the bottom of the messages, scroll down
  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight
  }
}

// Handle incoming messages
socket.on('pesan', (message) => {
  console.log(message)
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format('H:mm')
  })
  $messages.insertAdjacentHTML('beforeend', html)
  autoScroll()
})

// Handle location messages
socket.on('locationMessage', (message) => {
  console.log(message)
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username,
    url: message.url,
    createdAt: moment(message.createdAt).format('H:mm')
  })
  $messages.insertAdjacentHTML('beforeend', html)
})

// Handle room data (sidebar users and room name)
socket.on('roomData', ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users
  })
  document.querySelector('#sidebar').innerHTML = html
})

// Form submit for sending messages
$messageForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // Disable send button while sending
  $messageFormButton.setAttribute('disabled', 'disabled')

  const pesan = e.target.elements.pesan.value

  socket.emit('kirimPesan', pesan, (error) => {
    // Enable send button after sending
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()

    if (error) {
      return console.log(error)
    }
    console.log('Pesan berhasil dikirim')
  })
})

// Send location on button click
$sendLocationButton.addEventListener('click', (e) => {
  if (!navigator.geolocation) {
    return alert('Browser Anda tidak mendukung Geolocation')
  }

  $sendLocationButton.setAttribute('disabled', 'disabled')

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('kirimLokasi', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => {
      $sendLocationButton.removeAttribute('disabled')
      console.log('Lokasi berhasil dikirim')
    })
  })
})

// Join the chat room on load
socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error)
    location.href = '/'
  }
})
