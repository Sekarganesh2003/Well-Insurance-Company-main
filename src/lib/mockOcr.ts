
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
  
  // Mock extracted data with different confidence levels
  const extractedData: OcrExtractedData = {
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
  const extractedData: OcrExtractedData = {
    patientName: 'Alice Roberts',
    patientId: '2',
    hospitalName: 'Metro Care',
    diagnosis: 'Knee Replacement Surgery',
    diagnosisCode: 'Z96.651',
    treatmentDetails: 'Total knee replacement followed by physiotherapy sessions',
    claimAmount: 18000.00,
    serviceDate: '2025-03-22',
    confidence: {
      patientName: 0.94,
      patientId: 0.96,
      hospitalName: 0.91,
      diagnosis: 0.87,
      diagnosisCode: 0.93,
      treatmentDetails: 0.85,
      claimAmount: 0.89,
      serviceDate: 0.95
    }
  };
  const extractedData: OcrExtractedData = {
    patientName: 'David Kumar',
    patientId: '3',
    hospitalName: 'Sunrise Health',
    diagnosis: 'Cosmetic Rhinoplasty',
    diagnosisCode: 'Z41.1',
    treatmentDetails: 'Elective cosmetic surgery for nasal reshaping',
    claimAmount: 6000.00,
    serviceDate: '2025-02-18',
    confidence: {
      patientName: 0.93,
      patientId: 0.95,
      hospitalName: 0.90,
      diagnosis: 0.86,
      diagnosisCode: 0.91,
      treatmentDetails: 0.84,
      claimAmount: 0.88,
      serviceDate: 0.94
    }
  };
  const extractedData: OcrExtractedData = {
    patientName: 'Priya Singh',
    patientId: '4',
    hospitalName: 'GreenLife Clinic',
    diagnosis: 'General Health Checkup',
    diagnosisCode: 'Z00.00',
    treatmentDetails: 'Annual health checkup including blood test, ECG, and physician consultation',
    claimAmount: 120.00,
    serviceDate: '2025-04-01',
    confidence: {
      patientName: 0.96,
      patientId: 0.98,
      hospitalName: 0.93,
      diagnosis: 0.89,
      diagnosisCode: 0.95,
      treatmentDetails: 0.86,
      claimAmount: 0.91,
      serviceDate: 0.97
    }
  };
  return extractedData;
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
