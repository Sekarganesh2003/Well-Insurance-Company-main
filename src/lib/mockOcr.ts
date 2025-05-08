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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockPatients: Record<string, OcrExtractedData> = {
  "1": {
    patientName: 'Alice Patient',
    patientId: '1',
    hospitalName: 'Metro Care Center',
    diagnosis: 'Minor Injury',
    diagnosisCode: 'S00.0',
    treatmentDetails: 'Wound cleaning, bandaging',
    claimAmount: 150.00,
    serviceDate: '2025-04-12',
    confidence: {
      patientName: 0.94,
      patientId: 0.95,
      hospitalName: 0.91,
      diagnosis: 0.89,
      diagnosisCode: 0.93,
      treatmentDetails: 0.85,
      claimAmount: 0.88,
      serviceDate: 0.97
    }
  },
  "2": {
    patientName: 'Bob Patient',
    patientId: '2',
    hospitalName: 'Sunrise Hospital',
    diagnosis: 'Cosmetic Surgery',
    diagnosisCode: 'Z41.1',
    treatmentDetails: 'Nose reshaping surgery',
    claimAmount: 3200.00,
    serviceDate: '2025-04-14',
    confidence: {
      patientName: 0.92,
      patientId: 0.94,
      hospitalName: 0.88,
      diagnosis: 0.91,
      diagnosisCode: 0.90,
      treatmentDetails: 0.79,
      claimAmount: 0.91,
      serviceDate: 0.93
    }
  }
};

export const processDocumentOcr = async (file: File): Promise<OcrExtractedData> => {
  console.log('Processing document with simulated OCR:', file.name);
  await delay(1500);
  const id = file.name.match(/\d+/)?.[0] || "1";
  return mockPatients[id] || mockPatients["1"];
};

export const performFraudCheck = async (data: OcrExtractedData) => {
  await delay(800);
  const fraudFlags = [];
  let isFraudSuspected = false;

  if (data.claimAmount && data.claimAmount > 1000) {
    fraudFlags.push({
      type: 'high_amount',
      description: 'Claim amount is unusually high for this diagnosis',
      severity: 'medium'
    });
    isFraudSuspected = true;
  }

  const requiredFields = ['patientName', 'diagnosis', 'treatmentDetails', 'claimAmount'];
  const missingFields = requiredFields.filter(field => !data[field as keyof OcrExtractedData]);
  if (missingFields.length > 0) {
    fraudFlags.push({
      type: 'missing_info',
      description: `Missing required information: ${missingFields.join(', ')}`,
      severity: 'low'
    });
  }

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

export const verifyPolicyCompliance = async (
  patientId: string,
  diagnosis: string,
  claimAmount: number
) => {
  await delay(1000);
  const mockPolicies: Record<string, any> = {
    '1': { expirationDate: '2025-12-31', coverageLimit: 5000, usedCoverage: 750, excludedTreatments: [] },
    '2': { expirationDate: '2026-01-31', coverageLimit: 5000, usedCoverage: 200, excludedTreatments: [] },
    '3': { expirationDate: '2025-12-31', coverageLimit: 5000, usedCoverage: 1000, excludedTreatments: ['cosmetic surgery'] },
    '4': { expirationDate: '2025-12-31', coverageLimit: 5000, usedCoverage: 100, excludedTreatments: ['experimental treatments'] }
  };

  const policy = mockPolicies[patientId];
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

  const isPolicyCurrent = new Date(policy.expirationDate) > new Date();
  if (!isPolicyCurrent) issues.push(`Policy expired on ${policy.expirationDate}`);

  const isTreatmentCovered = !policy.excludedTreatments.some(excluded =>
    diagnosis.toLowerCase().includes(excluded.toLowerCase())
  );
  if (!isTreatmentCovered) issues.push('This treatment is excluded from policy coverage');

  const remainingCoverage = policy.coverageLimit - policy.usedCoverage;
  const isWithinClaimLimit = claimAmount <= remainingCoverage;
  if (!isWithinClaimLimit) issues.push(`Claim exceeds remaining coverage (${remainingCoverage.toFixed(2)})`);

  return {
    isCompliant: isPolicyCurrent && isTreatmentCovered && isWithinClaimLimit,
    isPolicyCurrent,
    isTreatmentCovered,
    isWithinClaimLimit,
    remainingCoverage,
    issues: issues.length > 0 ? issues : undefined
  };
};
