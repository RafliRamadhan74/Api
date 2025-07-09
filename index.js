// index.js
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Dummy data untuk mahasiswa
let mahasiswa = [
  { id: 1, nama: 'Rafli Ramadhan', ipk: 3.75 },
  { id: 2, nama: 'Siti Nurhaliza', ipk: 3.9 }
]

// GET semua mahasiswa
app.get('/mahasiswa', (req, res) => {
  res.json(mahasiswa)
})

// POST tambah mahasiswa
app.post('/mahasiswa', (req, res) => {
  const data = req.body
  data.id = mahasiswa.length + 1
  mahasiswa.push(data)
  res.status(201).json(data)
})

// PUT edit mahasiswa
app.put('/mahasiswa/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = mahasiswa.findIndex(m => m.id === id)
  if (index !== -1) {
    mahasiswa[index] = { ...mahasiswa[index], ...req.body }
    res.json(mahasiswa[index])
  } else {
    res.status(404).json({ error: 'Mahasiswa tidak ditemukan' })
  }
})

// DELETE hapus mahasiswa
app.delete('/mahasiswa/:id', (req, res) => {
  const id = parseInt(req.params.id)
  mahasiswa = mahasiswa.filter(m => m.id !== id)
  res.status(204).end()
})

// Default route
app.get('/', (req, res) => {
  res.send('API Mahasiswa is running 🚀')
})

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})