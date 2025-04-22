
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useClaims } from "@/hooks/useClaims";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Upload, LoaderCircle, AlertTriangle, X } from "lucide-react";
import OcrPreview from "./OcrPreview";
import { processDocumentOcr, OcrExtractedData } from "@/lib/mockOcr";

const ClaimUploadForm = () => {
  const { uploadClaim, processingClaim } = useClaims();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [diagnosis, setDiagnosis] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [treatmentDetails, setTreatmentDetails] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
  const [extractedData, setExtractedData] = useState<OcrExtractedData | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setSelectedFile(file);
      setIsProcessingOcr(true);
      
      try {
        const data = await processDocumentOcr(file);
        setExtractedData(data);
        
        // Prefill form with OCR data
        if (data.diagnosis) setDiagnosis(data.diagnosis);
        if (data.treatmentDetails) setTreatmentDetails(data.treatmentDetails);
        if (data.claimAmount) setClaimAmount(data.claimAmount.toString());
      } catch (error) {
        toast({
          title: "OCR Processing Failed",
          description: "Failed to extract information from the document",
          variant: "destructive"
        });
      } finally {
        setIsProcessingOcr(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "Document Required",
        description: "Please upload a medical document",
        variant: "destructive"
      });
      return;
    }
    
    const formData = new FormData();
    formData.append('document', selectedFile);
    formData.append('diagnosis', diagnosis);
    formData.append('treatmentDetails', treatmentDetails);
    formData.append('claimAmount', claimAmount);
    
    if (user?.role === 'hospital') {
      formData.append('patientId', extractedData?.patientId || '');
      formData.append('patientName', extractedData?.patientName || '');
    }
    
    try {
      const newClaim = await uploadClaim(formData);
      navigate(`/claim/${newClaim.id}`);
    } catch (error) {
      console.error('Error submitting claim:', error);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setExtractedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Submit New Claim</CardTitle>
        <CardDescription>
          Upload medical documents and fill in claim details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="claim-form" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="document">Medical Document</Label>
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                {selectedFile ? (
                  <div className="relative border rounded-md p-4 bg-muted/30">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-md bg-primary/10 flex items-center justify-center">
                        <Upload className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1 overflow-hidden">
                        <p className="text-sm font-medium leading-none truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={clearFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {isProcessingOcr && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <LoaderCircle className="h-3 w-3 animate-spin" />
                        Processing document...
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border border-dashed rounded-md p-8 text-center">
                    <Input
                      id="document"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <Label
                      htmlFor="document"
                      className="flex flex-col items-center gap-2 cursor-pointer"
                    >
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Click to upload a document
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PDF, JPG or PNG (max 10MB)
                      </span>
                    </Label>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {extractedData && (
            <OcrPreview extractedData={extractedData} />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Input
                id="diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g., Acute Bronchitis"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="claimAmount">Claim Amount ($)</Label>
              <Input
                id="claimAmount"
                type="number"
                step="0.01"
                min="0"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                placeholder="e.g., 485.50"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="treatmentDetails">Treatment Details</Label>
            <Textarea
              id="treatmentDetails"
              value={treatmentDetails}
              onChange={(e) => setTreatmentDetails(e.target.value)}
              placeholder="Provide details about the treatment received"
              rows={4}
              required
            />
          </div>
          
          {!extractedData && selectedFile && !isProcessingOcr && (
            <div className="flex items-center p-3 text-sm rounded-md bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
              <p>No information could be extracted from the document. Please fill in the form manually.</p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
        <Button 
          type="submit" 
          form="claim-form" 
          disabled={processingClaim || isProcessingOcr}
        >
          {processingClaim ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Submit Claim"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClaimUploadForm;
