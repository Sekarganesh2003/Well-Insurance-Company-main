
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
  
  // Simulate OCR processing time
  await delay(1500);
  
  // Mock extracted data for Sharma (Approved)
const sharmaData: OcrExtractedData = {
  patientName: 'Amit Sharma',
  patientId: '2',
  hospitalName: 'Apollo Clinic',
  diagnosis: 'Hypertension',
  diagnosisCode: 'I10',
  treatmentDetails: 'BP Monitoring, ECG, Prescription for Amlodipine',
  claimAmount: 200.00,
  serviceDate: '2025-04-05',
  confidence: {
    patientName: 0.97,
    patientId: 0.96,
    hospitalName: 0.91,
    diagnosis: 0.93,
    diagnosisCode: 0.95,
    treatmentDetails: 0.89,
    claimAmount: 0.94,
    serviceDate: 0.98
  }
};

// Mock extracted data for Kumar (Approved)
const kumarData: OcrExtractedData = {
  patientName: 'Raj Kumar',
  patientId: '3',
  hospitalName: 'Sunrise Health Center',
  diagnosis: 'Type 2 Diabetes',
  diagnosisCode: 'E11',
  treatmentDetails: 'Blood Sugar Test, Consultation, Metformin',
  claimAmount: 350.00,
  serviceDate: '2025-04-03',
  confidence: {
    patientName: 0.96,
    patientId: 0.95,
    hospitalName: 0.92,
    diagnosis: 0.94,
    diagnosisCode: 0.93,
    treatmentDetails: 0.90,
    claimAmount: 0.91,
    serviceDate: 0.95
  }
};

// Mock extracted data for Kishore (Rejected)
const kishoreData: OcrExtractedData = {
  patientName: 'Vinod Kishore',
  patientId: '4',
  hospitalName: 'Noble Health',
  diagnosis: 'Back Pain',
  diagnosisCode: 'M54.5',
  treatmentDetails: 'Consultation, Painkillers',
  claimAmount: 150.00,
  serviceDate: '2025-04-09',
  confidence: {
    patientName: 0.82,
    patientId: 0.80,
    hospitalName: 0.78,
    diagnosis: 0.74,
    diagnosisCode: 0.75,
    treatmentDetails: 0.70,
    claimAmount: 0.76,
    serviceDate: 0.79
  }
};


// NLP processing for fraud detection
export const performFraudCheck = async (data: OcrExtractedData): Promise<{
  isFraudSuspected: boolean;
  fraudFlags: Array<{
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}> => {
  // Simulate processing delay
  await delay(800);
  
  const fraudFlags = [];
  let isFraudSuspected = false;
  
  // Simple rule-based fraud detection
  if (data.claimAmount && data.claimAmount > 1000) {
    fraudFlags.push({
      type: 'high_amount',
      description: 'Claim amount is unusually high for this diagnosis',
      severity: 'medium'
    });
    isFraudSuspected = true;
  }
  
  // Check for incomplete information
  const requiredFields = ['patientName', 'diagnosis', 'treatmentDetails', 'claimAmount'];
  const missingFields = requiredFields.filter(field => !data[field as keyof OcrExtractedData]);
  
  if (missingFields.length > 0) {
    fraudFlags.push({
      type: 'missing_info',
      description: `Missing required information: ${missingFields.join(', ')}`,
      severity: 'low'
    });
  }
  
  // Check for low confidence in key fields
  Object.entries(data.confidence).forEach(([field, confidence]) => {
    if (confidence < 0.8 && requiredFields.includes(field)) {
      fraudFlags.push({
        type: 'low_confidence',
        description: `Low confidence in extracted ${field} (${(confidence * 100).toFixed(0)}%)`,
        severity: 'low'
      });
    }
  });
  
  return {
    isFraudSuspected,
    fraudFlags
  };
};

// Policy verification function
export const verifyPolicyCompliance = async (
  patientId: string,
  diagnosis: string,
  claimAmount: number
): Promise<{
  isCompliant: boolean;
  isPolicyCurrent: boolean;
  isTreatmentCovered: boolean;
  isWithinClaimLimit: boolean;
  remainingCoverage?: number;
  issues?: string[];
}> => {
  // Simulate verification delay
  await delay(1000);
  
  // Mock policy database check
  const mockPolicies = {
    '1': {
      policyNumber: 'POL-123456',
      expirationDate: '2025-12-31',
      coverageLimit: 5000,
      usedCoverage: 750,
      excludedTreatments: ['cosmetic surgery', 'experimental treatments']
    }
  };
  
  const policy = mockPolicies[patientId as keyof typeof mockPolicies];
  const issues: string[] = [];
  
  if (!policy) {
    return {
      isCompliant: false,
      isPolicyCurrent: false,
      isTreatmentCovered: false,
      isWithinClaimLimit: false,
      issues: ['Policy not found for this patient']
    };
  }
  
  // Check if policy is current
  const isPolicyCurrent = new Date(policy.expirationDate) > new Date();
  if (!isPolicyCurrent) {
    issues.push(`Policy expired on ${policy.expirationDate}`);
  }
  
  // Check if treatment is covered
  const isTreatmentCovered = !policy.excludedTreatments.some(
    excluded => diagnosis.toLowerCase().includes(excluded.toLowerCase())
  );
  if (!isTreatmentCovered) {
    issues.push('This treatment is excluded from policy coverage');
  }
  
  // Check if within claim limit
  const remainingCoverage = policy.coverageLimit - policy.usedCoverage;
  const isWithinClaimLimit = claimAmount <= remainingCoverage;
  if (!isWithinClaimLimit) {
    issues.push(`Claim exceeds remaining coverage (${remainingCoverage.toFixed(2)})`);
  }
  
  return {
    isCompliant: isPolicyCurrent && isTreatmentCovered && isWithinClaimLimit,
    isPolicyCurrent,
    isTreatmentCovered,
    isWithinClaimLimit,
    remainingCoverage,
    issues: issues.length > 0 ? issues : undefined
  };
};
