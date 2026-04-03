const res = await fetch("https://web-developer-kp-kamtatiwari.aws-ap-south-1.turso.io/v2/pipeline", {
  method: "POST",
  headers: {
    "Authorization": "Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzM5MDg3OTMsImlkIjoiMDE5ZDA1MWItNDgwMS03ZTUzLTg2NWQtODgwYTdjMWUyZjYzIiwicmlkIjoiNjFhY2Y0Y2YtZWY1Yi00OTdhLThhOWYtODk5YmIyNDg0MTFlIn0.bESZpK1eUSROyiujkl-fk8dkQOF6rum0Sl0pZTyR_25IXQSckObQ0dTizcZ9JVEiw9_pNTWJyombgnhei1o6Aw",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    requests: [
      {
        type: "execute",
        stmt: {
          sql: "INSERT INTO software_registry (software_key, name, turso_url, turso_token, redirect_url, activate_url) VALUES (?, ?, ?, ?, ?, ?)",
          args: [
            { type: "text", value: "hotel" },
            { type: "text", value: "Nishant Hotel Pro" },
            { type: "text", value: "libsql://hotel-pro-kamtatiwari.aws-ap-south-1.turso.io" },
            { type: "text", value: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzUyMTA0MzUsImlkIjoiMDE5ZDUyYzktNDkwMS03ZDJiLTg5NTQtOTc3NDY4YjYzMzNjIiwicmlkIjoiOWFiNjdiZGEtYWRmZi00YjA5LTkyNmYtNjJhMjcyMmM0MzExIn0.xk5x6fUSl_s0knAYrla1qRrSYCcQkfDemSkql5zFPUbiiyeHkK7nP8Sjqs83tFZq1ONUmfxDa4D3gNg5fuUCAQ" },
            { type: "text", value: "https://hotel-pro-ten.vercel.app/login?success=1" },
            { type: "text", value: "" }
          ]
        }
      },
      { type: "close" }
    ]
  })
});
const data = await res.json();
console.log(JSON.stringify(data, null, 2));