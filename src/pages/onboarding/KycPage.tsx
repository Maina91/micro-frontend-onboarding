import type React from "react";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Upload, FileText, Camera } from "lucide-react";
// import { kycAction } from "../../server/actions/kyc";

export function KycPage() {
  const [formData, setFormData] = useState({
    documentType: "drivers_license",
    documentNumber: "",
    expirationDate: "",
    frontImage: "",
    backImage: "",
    selfieImage: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // try {
    //   const userId = "1"; // In real implementation, extract from JWT token
    //   const result = await kycAction({ ...formData, userId });

    //   if (result.success) {
    //     window.location.href = result.data.nextStep;
    //   } else {
    //     setError(result.error || "Failed to submit KYC documents");
    //   }
    // } catch (error) {
    //   console.error("[KYC_FORM_ERROR]", error);
    //   setError("An unexpected error occurred");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleFileUpload = (field: string) => {
    // Mock file upload - in real implementation, handle actual file upload
    const mockUrl = `https://example.com/uploads/${field}_${Date.now()}.jpg`;
    setFormData((prev) => ({ ...prev, [field]: mockUrl }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Identity Verification
        </h2>
        <p className="text-muted-foreground">
          Upload your identification documents for verification
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
            {error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Document Information</CardTitle>
            <CardDescription>
              Select your identification document type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select
                value={formData.documentType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, documentType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drivers_license">
                    Driver's License
                  </SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="national_id">National ID</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentNumber">Document Number</Label>
              <Input
                id="documentNumber"
                value={formData.documentNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    documentNumber: e.target.value,
                  }))
                }
                placeholder="Enter your document number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expirationDate">Expiration Date</Label>
              <Input
                id="expirationDate"
                type="date"
                value={formData.expirationDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expirationDate: e.target.value,
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>
              Upload clear photos of your identification document
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Front of Document</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {formData.frontImage ? (
                    <div className="space-y-2">
                      <FileText className="h-8 w-8 text-green-500 mx-auto" />
                      <p className="text-sm text-green-600">
                        Document uploaded
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload front
                      </p>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                    onClick={() => handleFileUpload("frontImage")}
                  >
                    Upload Front
                  </Button>
                </div>
              </div>

              {formData.documentType !== "passport" && (
                <div className="space-y-2">
                  <Label>Back of Document</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {formData.backImage ? (
                      <div className="space-y-2">
                        <FileText className="h-8 w-8 text-green-500 mx-auto" />
                        <p className="text-sm text-green-600">
                          Document uploaded
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload back
                        </p>
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                      onClick={() => handleFileUpload("backImage")}
                    >
                      Upload Back
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Selfie Verification</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center max-w-sm mx-auto">
                {formData.selfieImage ? (
                  <div className="space-y-2">
                    <Camera className="h-8 w-8 text-green-500 mx-auto" />
                    <p className="text-sm text-green-600">Selfie uploaded</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Camera className="h-8 w-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      Take a selfie for verification
                    </p>
                  </div>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-transparent"
                  onClick={() => handleFileUpload("selfieImage")}
                >
                  Take Selfie
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? "Submitting Documents..." : "Submit for Verification"}
        </Button>
      </form>
    </div>
  );
}
