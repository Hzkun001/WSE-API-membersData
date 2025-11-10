import express from "express";
import morgan from "morgan";
import membersRoutes from "./routes/members.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// JSON only (content negotiation sederhana)
app.use(express.json());
app.use(morgan("dev"));

// Info endpoint (kebutuhan ceklist)
app.get("/api/info", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Service info",
    data: {
      name: "UTS-WSE Members API",
      version: "v1",
      time: new Date().toISOString(),
      resources: ["/api/members"],
      principles7: [
        "Resource-based URI: /api/members, /api/members/:id",
        "HTTP methods semantics: GET/POST/PUT/PATCH/DELETE",
        "Stateless: tidak pakai session server",
        "Proper status codes: 200/201/400/404/500/304",
        "Consistent JSON structure: {status,message,data|errors}",
        "Caching hints: ETag + 304 untuk GET list",
        "HATEOAS ringan: links self & collection pada POST"
      ]
    }
  });
});

// Routes utama
app.use("/api/members", membersRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ status: "fail", message: "Endpoint tidak ditemukan" });
});

// Error handler global
app.use(errorHandler);

// Start server (nodemon jalankan via npm run dev)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Members API running on http://localhost:${PORT}`));
