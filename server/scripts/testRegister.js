fetch('http://localhost:5001/api/users/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Tshedzaa',
    email: 'tshedzam@gmail.com',
    password: '123456',
  }),
})
  .then(res => res.json())
  .then(data => console.log('Response:', data))
  .catch(err => console.error('Error:', err));