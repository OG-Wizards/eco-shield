// frontend/src/utils/api.js

// Backend URL
export const BACKEND_URL = "http://localhost:5000";

// Upload CSV file
export const uploadCSV = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${BACKEND_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to upload CSV: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    console.log("CSV upload success:", data);
    alert("CSV uploaded and metrics calculated successfully!");
    return data;
  } catch (err) {
    console.error("Upload error:", err);
    alert(`Upload failed: ${err.message}`);
    throw err;
  }
};

// Get all samples
export const getSamples = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/samples`);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch samples: ${res.status} ${errorText}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch samples error:", err);
    alert(`Failed to fetch samples: ${err.message}`);
    throw err;
  }
};
