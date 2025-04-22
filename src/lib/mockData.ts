
import { User, UserRole } from "@/hooks/useAuth";

export interface Claim {
  id: string;
  patientId: string;
  patientName: string;
  hospitalId?: string;
  hospitalName: string;
  diagnosisCode: string;
  diagnosis: string;
  treatmentDetails: string;
  documentUrls: string[];
  claimAmount: number;
  status: ClaimStatus;
  submittedDate: string;
  updatedDate: string;
  comments: ClaimComment[];
  fraudFlags?: FraudFlag[];
  extractedData?: Record<string, string>;
  policyVerification?: PolicyVerification;
}

export type ClaimStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'additional_info';

export interface ClaimComment {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  text: string;
  timestamp: string;
}

export interface FraudFlag {
  type: 'repeated_claim' | 'high_amount' | 'mismatched_data' | 'missing_info';
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface PolicyVerification {
  isPolicyCurrent: boolean;
  isTreatmentCovered: boolean;
  isWithinClaimLimit: boolean;
  remainingCoverage?: number;
  issues?: string[];
}

// Mock claims data
export const mockClaims: Claim[] = [
  {
    id: 'C001',
    patientId: '1',
    patientName: 'John Patient',
    hospitalId: '2',
    hospitalName: 'City General Hospital',
    diagnosisCode: 'J45.901',
    diagnosis: 'Asthma, unspecified',
    treatmentDetails: 'Emergency room visit, nebulizer treatment, prescription for albuterol',
    documentUrls: ['/placeholder.svg'],
    claimAmount: 750.00,
    status: 'approved',
    submittedDate: '2025-03-15T10:30:00Z',
    updatedDate: '2025-03-20T14:45:00Z',
    comments: [
      {
        id: 'CM001',
        userId: '3',
        userName: 'Admin User',
        userRole: 'admin',
        text: 'Claim approved after verification of policy coverage.',
        timestamp: '2025-03-20T14:45:00Z'
      }
    ],
    policyVerification: {
      isPolicyCurrent: true,
      isTreatmentCovered: true,
      isWithinClaimLimit: true,
      remainingCoverage: 4250.00
    }
  },
  {
    id: 'C002',
    patientId: '1',
    patientName: 'John Patient',
    hospitalId: '2',
    hospitalName: 'City General Hospital',
    diagnosisCode: 'S52.501A',
    diagnosis: 'Fracture of the lower end of radius',
    treatmentDetails: 'X-ray, cast application, follow-up appointment in 6 weeks',
    documentUrls: ['/placeholder.svg'],
    claimAmount: 1200.00,
    status: 'under_review',
    submittedDate: '2025-04-05T09:15:00Z',
    updatedDate: '2025-04-05T09:15:00Z',
    comments: [],
    policyVerification: {
      isPolicyCurrent: true,
      isTreatmentCovered: true,
      isWithinClaimLimit: true,
      remainingCoverage: 3050.00
    }
  },
  {
    id: 'C003',
    patientId: '1',
    patientName: 'John Patient',
    hospitalId: '2',
    hospitalName: 'City General Hospital',
    diagnosisCode: 'J03.00',
    diagnosis: 'Acute streptococcal tonsillitis',
    treatmentDetails: 'Consultation, strep test, prescription for antibiotics',
    documentUrls: ['/placeholder.svg'],
    claimAmount: 350.00,
    status: 'pending',
    submittedDate: '2025-04-10T16:20:00Z',
    updatedDate: '2025-04-10T16:20:00Z',
    comments: [],
  },
  {
    id: 'C004',
    patientId: '4',
    patientName: 'Sarah Johnson',
    hospitalId: '2',
    hospitalName: 'City General Hospital',
    diagnosisCode: 'M54.5',
    diagnosis: 'Low back pain',
    treatmentDetails: 'Physical therapy, 6 sessions, prescription for muscle relaxants',
    documentUrls: ['/placeholder.svg'],
    claimAmount: 1800.00,
    status: 'pending',
    submittedDate: '2025-04-08T11:45:00Z',
    updatedDate: '2025-04-08T11:45:00Z',
    comments: [],
    fraudFlags: [
      {
        type: 'high_amount',
        description: 'Claim amount exceeds typical cost for this treatment',
        severity: 'medium'
      }
    ]
  },
  {
    id: 'C005',
    patientId: '5',
    patientName: 'Michael Brown',
    hospitalId: '2',
    hospitalName: 'City General Hospital',
    diagnosisCode: 'K29.70',
    diagnosis: 'Gastritis, unspecified',
    treatmentDetails: 'Endoscopy, biopsy, medication prescription',
    documentUrls: ['/placeholder.svg'],
    claimAmount: 2200.00,
    status: 'rejected',
    submittedDate: '2025-03-25T14:10:00Z',
    updatedDate: '2025-03-30T09:20:00Z',
    comments: [
      {
        id: 'CM002',
        userId: '3',
        userName: 'Admin User',
        userRole: 'admin',
        text: 'Claim rejected due to policy expiration. Please renew your policy.',
        timestamp: '2025-03-30T09:20:00Z'
      }
    ],
    policyVerification: {
      isPolicyCurrent: false,
      isTreatmentCovered: true,
      isWithinClaimLimit: true,
      issues: ['Policy expired on 2025-03-01']
    }
  }
];

// Function to get claims for a specific user
export const getUserClaims = (userId: string) => {
  return mockClaims.filter(claim => claim.patientId === userId);
};

// Function to get claims for a specific hospital
export const getHospitalClaims = (hospitalId: string) => {
  return mockClaims.filter(claim => claim.hospitalId === hospitalId);
};

// Function to get all claims (for admin)
export const getAllClaims = () => {
  return mockClaims;
};

// Function to get a specific claim by ID
export const getClaimById = (claimId: string) => {
  return mockClaims.find(claim => claim.id === claimId);
};
