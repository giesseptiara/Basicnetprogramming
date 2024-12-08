const users = []

// tambahPengguna
const tambahPengguna = ({ id, username, room }) => {
  // bersihkan data
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  // validasi data
  if (!username || !room) {
    return { error: 'Username dan room dibutuhkan!' }
  }

  // cek pengguna yang sudah ada
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username
  })

  // validasi username
  if (existingUser) {
    return { error: 'Username sudah digunakan!' }
  }

  // simpan pengguna
  const user = { id, username, room }
  users.push(user)

  return { user }
}

// hapusPengguna
const hapusPengguna = (id) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

// ambilPengguna
const ambilPengguna = (id) => {
  return users.find((user) => user.id === id)
}

// ambilPenggunaDariRoom
const ambilPenggunaDariRoom = (room) => {
  room = room.trim().toLowerCase()
  return users.filter((user) => user.room === room)
}

module.exports = {
  tambahPengguna,
  hapusPengguna,
  ambilPengguna,
  ambilPenggunaDariRoom
}
