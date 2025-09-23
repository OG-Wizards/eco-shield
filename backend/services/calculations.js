export const calculateHMPI = (elements) => {
  // simple HMPI calculation example
  let sum = 0;
  let count = 0;
  for (let key in elements) {
    sum += parseFloat(elements[key] || 0);
    count++;
  }
  return count ? sum / count : 0;
};

// Placeholder for Researcher
export const calculateHEICD = (elements) => 1.23;
export const calculateMPI = (elements) => 2.34;
export const calculatePLI = (elements) => 3.45;
