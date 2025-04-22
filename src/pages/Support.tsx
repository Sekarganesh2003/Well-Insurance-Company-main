import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { HelpCircle, Phone, Mail, MapPin, CheckCircle } from "lucide-react";

const Support = () => {
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll respond soon.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };
  
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Have questions or need assistance? Our support team is here to help.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium">How do I file a new claim?</h3>
                <p className="text-muted-foreground">
                  To file a new claim, navigate to the "Upload Claim" page from your dashboard. Upload the required medical documents, 
                  verify the extracted information, and submit your claim for processing.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">What documents are required for claim submission?</h3>
                <p className="text-muted-foreground">
                  You'll need medical bills, doctor's prescription, diagnostic reports, hospital discharge summary (if applicable),
                  and any other relevant medical documents as evidence for your claim.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">How long does it take to process a claim?</h3>
                <p className="text-muted-foreground">
                  Standard claims are usually processed within 5-7 business days. Complex claims that require
                  additional verification may take 7-14 business days. You can always check the status of your claim on your dashboard.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">What should I do if my claim is rejected?</h3>
                <p className="text-muted-foreground">
                  If your claim is rejected, review the rejection reason provided. You can submit additional information
                  or appeal the decision by contacting our support team or through your dashboard.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {submitted ? (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center text-center p-6">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Thanks for reaching out!</h3>
                  <p className="text-muted-foreground mb-4">
                    We've received your message and will get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Send us a message and we'll get back to you</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="What is this regarding?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out to our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-medical-blue mt-0.5" />
                <div>
                  <h4 className="font-medium">Student Support Team</h4>
                  <div className="text-muted-foreground">
                    <p>Ganesh Kumar C</p>
                    <p>Praveen SM</p>
                    <p>Sanjai K</p>
                    <p>Dennis D Souza</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-medical-blue mt-0.5" />
                <div>
                  <h4 className="font-medium">Legal Advisor</h4>
                  <p className="text-muted-foreground">
                    Dr. M. Rajalakshmi, Associate Professor - IT
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-medical-blue mt-0.5" />
                <div>
                  <h4 className="font-medium">Head Office</h4>
                  <p className="text-muted-foreground">
                    Tagore Engg College,<br />
                    Chennai - 600 127<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a href="#" className="flex items-center gap-2 text-medical-blue hover:underline">
                <HelpCircle className="h-4 w-4" />
                <span>User Guide & Tutorials</span>
              </a>
              
              <a href="#" className="flex items-center gap-2 text-medical-blue hover:underline">
                <HelpCircle className="h-4 w-4" />
                <span>Policy Documents</span>
              </a>
              
              <a href="#" className="flex items-center gap-2 text-medical-blue hover:underline">
                <HelpCircle className="h-4 w-4" />
                <span>Network Hospitals List</span>
              </a>
              
              <a href="#" className="flex items-center gap-2 text-medical-blue hover:underline">
                <HelpCircle className="h-4 w-4" />
                <span>Claim Process Flowchart</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
