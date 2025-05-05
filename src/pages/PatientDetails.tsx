// PatientDetails.tsx
import React, { useState } from "react";
import { pdfDataMap } from "@/data/pdfDataMap";  // Import the pdfDataMap

const PatientDetails = () => {
  const [pdfName, setPdfName] = useState("");
  const [pdfDetails, setPdfDetails] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const name = file.name;
      setPdfName(name);
      const data = pdfDataMap[name];
      setPdfDetails(data || null); // Lookup PDF data
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      
      {pdfName && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Uploaded File:</h3>
          <p>{pdfName}</p>
        </div>
      )}

      {pdfDetails ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Claim Details</h3>
          <ul className="list-disc ml-4">
            {Object.entries(pdfDetails).map(([key, value]) =>
              key !== "confidence" ? (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ) : (
                <li key="confidence">
                  <strong>Confidence:</strong>
                  <ul className="list-disc ml-6">
                    {Object.entries(value).map(([k, v]) => (
                      <li key={k}>
                        {k}: {v}
                      </li>
                    ))}
                  </ul>
                </li>
              )
            )}
          </ul>
        </div>
      ) : pdfName && (
        <p className="text-red-500">No matching data found for this PDF.</p>
      )}
    </div>
  );
};

export default PatientDetails;
