import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import dotenv from "dotenv";

dotenv.config();

beforeAll(async () => {
	await mongoose.connect("mongodb://127.0.0.1:27017/testdb");
},50000);

afterAll(async () => {
	await mongoose.connection.close();
},50000);

describe("Test básico de /personas", () => {
	it("GET /personas responde con status 200", async () => {
		const res = await request(app).get("/personas");
		expect(res.statusCode).toBe(200);
	}, 150000);
});
