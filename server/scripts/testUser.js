fetch('http://localhost:5000/api/users', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDI5Y2Q1ZTJlOGNiMTVmMmNiOWUyNSIsImlhdCI6MTc3ODU1NjI4MSwiZXhwIjoxNzgxMTQ4MjgxfQ.9WaRBse0_wF-dLX1Z7QCi6gQMcdLEr-xYz1qJ64Xixc'
  }
})
  .then(res => res.json())
  .then(data => console.log(data));