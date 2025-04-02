import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

export function NewsletterDialog() {
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [open, setOpen] = useState(false);

  const handleVerify = async () => {
    if (email && email.includes("@")) {
      const verify = await fetch("http://localhost/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      if (verify.status === 200) {
        setShowOTP(true);
        toast.success("Verification code sent to your email!");
      }
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  const handleSubscribe = async () => {
    if (otp.length === 6) {
      const subsribe = await fetch("http://localhost/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, otp: otp }),
      });
      if(subsribe.status === 200) {
        toast.success("Successfully subscribed to newsletter!");
      }
      else{
        toast.error("Failed to subscribe. Please try again.");
      }
      setOpen(false);
      setShowOTP(false);
      setEmail("");
      setOTP("");
    } else {
      toast.error("Please enter a valid OTP");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          Newsletter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          {!showOTP ? (
            <>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <Button onClick={handleVerify} className="w-full">
                Verify Email
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code sent to {email}
                </p>
                <InputOTP
                  value={otp}
                  onChange={setOTP}
                  maxLength={6}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowOTP(false)}
                  className="w-full"
                >
                  Back
                </Button>
                <Button onClick={handleSubscribe} className="w-full">
                  Subscribe
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}