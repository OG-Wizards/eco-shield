import express from "express";
import multer from "multer";
import { db } from "../services/firebase.js";
import { parseCSV } from "../utils/csvParser.js";
import { verifyToken } from "../middleware/auth.js";
import { calculateHMPI, calculateHEICD, calculateMPI, calculatePLI } from "../services/calculations.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload CSV (Scientist)
router.post("/upload-csv", verifyToken, upload.single("file"), async (req, res) => {
  try {
    const rows = await parseCSV(req.file.path);
    for (const row of rows) {
      const { city, latitude, longitude, ...elements } = row;
      const hmpi = calculateHMPI(elements);
      const hei_cd = calculateHEICD(elements);
      const mpi = calculateMPI(elements);
      const pli = calculatePLI(elements);

      await db.collection("samples").add({
        city,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        elements,
        metrics: { hmpi, hei_cd, mpi, pli },
        createdAt: new Date(),
      });
    }
    res.json({ message: "CSV uploaded and processed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Manual sample (Scientist)
router.post("/manual-sample", verifyToken, async (req, res) => {
  try {
    const { city, latitude, longitude, elements } = req.body;
    const hmpi = calculateHMPI(elements);
    const hei_cd = calculateHEICD(elements);
    const mpi = calculateMPI(elements);
    const pli = calculatePLI(elements);

    await db.collection("samples").add({
      city,
      latitude,
      longitude,
      elements,
      metrics: { hmpi, hei_cd, mpi, pli },
      createdAt: new Date(),
    });
    res.json({ message: "Sample added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get samples (Researcher / Policymaker / Citizen)
router.get("/samples", verifyToken, async (req, res) => {
  try {
    const city = req.query.city;
    let query = db.collection("samples");
    if (city) query = query.where("city", "==", city);

    const snapshot = await query.get();
    const data = snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        city: d.city,
        latitude: d.latitude,
        longitude: d.longitude,
        elements: d.elements,
        metrics: d.metrics,
      };
    });
    res.json({ samples: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
