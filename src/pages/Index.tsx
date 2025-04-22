
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, ShieldCheck, Zap, CheckCircle, AlertTriangle, Search, Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Automated Medical Insurance Claims Processing
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Streamline healthcare claims with AI-powered document processing, fraud detection, and automated verification.
            </p>
            <p className="text-lg md:text-xl text-medical-blue font-medium mb-8">
              Quality is our habit, because your health and peace are our priority
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="px-8">
                <Link to="/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-medical-blue/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-medical-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">AI Document Processing</h3>
              <p className="text-muted-foreground">
                Our AI extracts key information from medical documents with high accuracy, eliminating manual data entry.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-medical-green/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-medical-green" />
              </div>
              <h3 className="text-xl font-medium mb-2">RPA Integration</h3>
              <p className="text-muted-foreground">
                Robotic Process Automation handles repetitive tasks, from form filling to generating summaries and notifications.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-medical-purple/10 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-medical-purple" />
              </div>
              <h3 className="text-xl font-medium mb-2">Fraud Detection</h3>
              <p className="text-muted-foreground">
                Advanced AI algorithms flag suspicious claims for review, reducing fraud and ensuring proper claim processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <ol className="space-y-6">
              <li className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-medical-blue flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Upload Documents</h3>
                  <p className="text-muted-foreground">
                    Upload medical documents in PDF or image format. Our OCR technology extracts important claim information.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-medical-blue flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">AI Processing</h3>
                  <p className="text-muted-foreground">
                    The system uses AI to recognize medical terms, diagnoses, and claim amounts, automatically filling claim forms.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-medical-blue flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Verification & Review</h3>
                  <p className="text-muted-foreground">
                    The system checks policy coverage and performs automated fraud detection before sending for approval.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-medical-blue flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Track in Real-Time</h3>
                  <p className="text-muted-foreground">
                    Follow your claim's progress through every step of the process with real-time notifications.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">For Every Healthcare Stakeholder</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-4">Patients</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-medical-green flex-shrink-0 mt-0.5" />
                  <span>Submit claims directly with medical documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-medical-green flex-shrink-0 mt-0.5" />
                  <span>Track claim status in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-medical-green flex-shrink-0 mt-0.5" />
                  <span>Review policy coverage and limits</span>
                </li>
              </ul>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-4">Healthcare Providers</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-medical-green flex-shrink-0 mt-0.5" />
                  <span>Submit claims on behalf of patients</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-medical-green flex-shrink-0 mt-0.5" />
                  <span>Track all submitted claims in one place</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-medical-green flex-shrink-0 mt-0.5" />
                  <span>Receive automated reimbursement updates</span>
                </li>
              </ul>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-medium mb-4">Insurance Admins</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-medical-green flex-shrink-0 mt-0.5" />
                  <span>Review claims with AI-assisted verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-medical-green flex-shrink-0 mt-0.5" />
                  <span>Receive fraud alerts on suspicious claims</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-medical-green flex-shrink-0 mt-0.5" />
                  <span>Access analytics on claims processing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Claims Processing?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our platform and experience the power of AI and automation in medical claims processing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/register">Create Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-medical-blue flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">Well Insurance Company</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-muted-foreground text-center md:text-right">
                © 2025 Well Insurance Company. This is a college project demonstration. Not for actual medical claim processing.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
