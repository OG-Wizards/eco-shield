import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

const app = express();
app.use(cors());
app.use(express.json());

// Upload folder
const UPLOADS_DIR = "uploads";
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// JSON storage
const DB_FILE = "samples.json";
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([]));

// Multer config
const upload = multer({ dest: UPLOADS_DIR });

// --- CSV Upload + Metric Calculation ---
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const samples = [];

  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on("data", (row) => {
      // Parse numeric values safely
      const latitude = parseFloat(row.Latitude || 0);
      const longitude = parseFloat(row.Longitude || 0);
      const hmpi = parseFloat(row.HMPI || 0);
      const hei_cd = parseFloat(row.HEICD || 0);
      const mpi = parseFloat(row.MPI || 0);
      const pli = parseFloat(row.PLI || 0);

      samples.push({
        id: Date.now() + Math.random(), // unique id
        city: row.City || "Unknown",
        latitude,
        longitude,
        metrics: { hmpi, hei_cd, mpi, pli },
      });
    })
    .on("end", () => {
      // Save to JSON database
      fs.writeFileSync(DB_FILE, JSON.stringify(samples, null, 2));
      res.json({ message: "CSV uploaded and metrics calculated!", samples });
    })
    .on("error", (err) => {
      console.error(err);
      res.status(500).json({ message: "Error processing CSV" });
    });
});

// --- Get all samples ---
app.get("/api/samples", (req, res) => {
  try {
    const samples = JSON.parse(fs.readFileSync(DB_FILE));
    res.json({ samples });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to read samples" });
  }
});

// --- Optional: list uploaded files ---
app.get("/api/uploads", (req, res) => {
  const files = fs.readdirSync(UPLOADS_DIR);
  res.json({ files });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
