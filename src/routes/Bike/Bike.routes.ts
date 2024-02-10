import { Hono } from "hono";

const bikeRoute = new Hono().basePath("/bikes");

app.post(":bikeId/rides");
