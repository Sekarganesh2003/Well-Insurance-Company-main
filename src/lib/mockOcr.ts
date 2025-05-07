export interface OcrExtractedData {
  patientName?: string;
  patientId?: string;
  hospitalName?: string;
  diagnosis?: string;
  diagnosisCode?: string;
  treatmentDetails?: string;
  claimAmount?: number;
  serviceDate?: string;
  confidence: Record<string, number>;
}

// Simulated delay to mimic OCR processing time
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated OCR processing function
export const processDocumentOcr = async (file: File): Promise<OcrExtractedData> => {
  console.log('Processing document with simulated OCR:', file.name);

  await delay(1500);

  // Return different patient data based on filename
  if (file.name.toLowerCase().includes("david")) return getDavidKumarData();
  if (file.name.toLowerCase().includes("alice")) return getAliceRobertsData();
  if (file.name.toLowerCase().includes("priya")) return getPriyaSinghData();

  // Default: John Patient
  return getJohnPatientData();
};

// ----------------------- MOCK PATIENT DATA ----------------------------

// John Patient (Rejected)
const getJohnPatientData = (): OcrExtractedData => {
  return {
    patientName: 'John Patient',
    patientId: '1',
    hospitalName: 'City General Hospital',
    diagnosis: 'Acute Bronchitis',
    diagnosisCode: 'J20.9',
    treatmentDetails: 'Consultation, chest X-ray, prescription for antibiotics and bronchodilators',
    claimAmount: 475.50,
    serviceDate: '2025-04-10',
    confidence: {
      patientName: 0.95,
      patientId: 0.97,
      hospitalName: 0.92,
      diagnosis: 0.88,
      diagnosisCode: 0.94,
      treatmentDetails: 0.82,
      claimAmount: 0.90,
      serviceDate: 0.96
    }
  };
};

// David Kumar (Approved)
const getDavidKumarData = (): OcrExtractedData => {
  return {
    patientName: 'David Kumar',
    patientId: '2',
    hospitalName: 'Apollo Care Hospital',
    diagnosis: 'Type 2 Diabetes',
    diagnosisCode: 'E11',
    treatmentDetails: 'Blood Sugar Test, Consultation, Metformin prescription',
    claimAmount: 300.00,
    serviceDate: '2025-04-04',
    confidence: {
      patientName: 0.96,
      patientId: 0.95,
      hospitalName: 0.92,
      diagnosis: 0.94,
      diagnosisCode: 0.97,
      treatmentDetails: 0.90,
      claimAmount: 0.91,
      serviceDate: 0.95
    }
  };
};

// Alice Roberts (Approved)
const getAliceRobertsData = (): OcrExtractedData => {
  return {
    patientName: 'Alice Roberts',
    patientId: '3',
    hospitalName: 'GreenLife Wellness',
    diagnosis: 'Migraine',
    diagnosisCode: 'G43.909',
    treatmentDetails: 'Neurology consultation, pain management therapy',
    claimAmount: 220.75,
    serviceDate: '2025-04-07',
    confidence: {
      patientName: 0.97,
      patientId: 0.95,
      hospitalName: 0.91,
      diagnosis: 0.93,
      diagnosisCode: 0.96,
      treatmentDetails: 0.89,
      claimAmount: 0.90,
      serviceDate: 0.94
    }
  };
};

// Priya Singh (Rejected)
const getPriyaSinghData = (): OcrExtractedData => {
  return {
    patientName: 'Priya Singh',
    patientId: '4',
    hospitalName: 'GreenLife Clinic',
    diagnosis: 'General Health Checkup',
    diagnosisCode: 'Z00.00',
    treatmentDetails: 'Blood test, ECG, General consultation',
    claimAmount: 120.00,
    serviceDate: '2025-04-01',
    confidence: {
      patientName: 0.81,
      patientId: 0.84,
      hospitalName: 0.79,
      diagnosis: 0.76,
      diagnosisCode: 0.78,
      treatmentDetails: 0.73,
      claimAmount: 0.80,
      serviceDate: 0.83
    }
  };
};
