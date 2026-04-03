import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/schema.js",
  dialect: "turso",
  dbCredentials: {
    url: "libsql://hotel-pro-kamtatiwari.aws-ap-south-1.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzUyMTA0MzUsImlkIjoiMDE5ZDUyYzktNDkwMS03ZDJiLTg5NTQtOTc3NDY4YjYzMzNjIiwicmlkIjoiOWFiNjdiZGEtYWRmZi00YjA5LTkyNmYtNjJhMjcyMmM0MzExIn0.xk5x6fUSl_s0knAYrla1qRrSYCcQkfDemSkql5zFPUbiiyeHkK7nP8Sjqs83tFZq1ONUmfxDa4D3gNg5fuUCAQ",
  },
});