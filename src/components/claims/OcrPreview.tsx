
import { Card } from "@/components/ui/card";
import { OcrExtractedData } from "@/lib/mockOcr";

interface OcrPreviewProps {
  extractedData: OcrExtractedData;
}

const OcrPreview = ({ extractedData }: OcrPreviewProps) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-medical-green";
    if (confidence >= 0.8) return "text-medical-blue";
    return "text-medical-yellow";
  };

  const renderDataItem = (label: string, value: string | undefined, confidenceKey: string) => {
    if (!value) return null;
    
    const confidence = extractedData.confidence[confidenceKey] || 0;
    const confidenceColor = getConfidenceColor(confidence);
    
    return (
      <div className="grid grid-cols-3 gap-2 py-1 border-b border-dashed border-muted last:border-0">
        <div className="text-sm font-medium text-muted-foreground">{label}</div>
        <div className="col-span-2 flex justify-between">
          <div className="text-sm ocr-highlight">{value}</div>
          <div className={`text-xs ${confidenceColor}`}>
            {Math.round(confidence * 100)}% confidence
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="p-4 bg-muted/30">
      <h3 className="font-medium mb-2 flex items-center">
        <span className="mr-2">📄</span> 
        Extracted Information
      </h3>
      <div className="space-y-1">
        {renderDataItem("Patient", extractedData.patientName, "patientName")}
        {renderDataItem("Hospital", extractedData.hospitalName, "hospitalName")}
        {renderDataItem("Diagnosis", extractedData.diagnosis, "diagnosis")}
        {renderDataItem("Code", extractedData.diagnosisCode, "diagnosisCode")}
        {renderDataItem("Treatment", extractedData.treatmentDetails, "treatmentDetails")}
        {renderDataItem("Amount", extractedData.claimAmount?.toString(), "claimAmount")}
        {renderDataItem("Service Date", extractedData.serviceDate, "serviceDate")}
      </div>
    </Card>
  );
};

export default OcrPreview;
