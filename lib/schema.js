import { sql } from "drizzle-orm";
import { integer, text, sqliteTable, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").default(""),
  status: text("status").default("trial"),
  expiryDate: text("expiry_date"),
  reminderSent: integer("reminder_sent").default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  hotel_name: text("hotel_name").default(""),
  owner_name: text("owner_name").default(""),
  gstin: text("gstin").default(""),
  address: text("address").default(""),
  city: text("city").default(""),
  phone: text("phone").default(""),
  receptionist_pin: text("receptionist_pin").default(""),
});

export const rooms = sqliteTable("rooms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  room_number: text("room_number").notNull(),
  type: text("type").notNull(),
  floor: integer("floor").default(0),
  ac: integer("ac").default(0),
  base_price: real("base_price").notNull(),
  status: text("status").default("available"),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const guests = sqliteTable("guests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  mobile: text("mobile").notNull(),
  id_proof_type: text("id_proof_type").default(""),
  id_proof_number: text("id_proof_number").default(""),
  address: text("address").default(""),
  city: text("city").default(""),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  booking_number: text("booking_number").notNull(),
  guest_id: integer("guest_id").notNull(),
  room_id: integer("room_id").notNull(),
  check_in: text("check_in").notNull(),
  check_out: text("check_out").notNull(),
  adults: integer("adults").default(1),
  children: integer("children").default(0),
  status: text("status").default("booked"),
  advance: real("advance").default(0),
  notes: text("notes").default(""),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const billing = sqliteTable("billing", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  booking_id: integer("booking_id").notNull(),
  room_charges: real("room_charges").default(0),
  extra_charges: real("extra_charges").default(0),
  extra_details: text("extra_details").default(""),
  gst_rate: real("gst_rate").default(0),
  gst_amount: real("gst_amount").default(0),
  total: real("total").default(0),
  paid: real("paid").default(0),
  due: real("due").default(0),
  payment_mode: text("payment_mode").default("cash"),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const staff = sqliteTable("staff", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").default("receptionist"),
  pin: text("pin").notNull(),
  active: integer("active").default(1),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const license = sqliteTable("license", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  active: integer("active").default(0),
  expires_at: text("expires_at").default(""),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});