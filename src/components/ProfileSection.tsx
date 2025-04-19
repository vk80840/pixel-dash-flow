import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from '@/components/ui/sonner';
import { Upload, Copy, Camera } from 'lucide-react';

const ProfileSection: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Profile updated", {
      description: "Your profile has been updated successfully.",
      duration: 3000,
    });
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("7892-3750-1594-2038");
    toast("Copied to clipboard", {
      description: "Account number has been copied successfully",
      duration: 3000,
    });
  };

  return (
    <div className="p-6 animate-fade-in">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 bg-background/30">
          <TabsTrigger value="personal" className="neon-glow">Personal Info</TabsTrigger>
          <TabsTrigger value="kyc" className="neon-glow">KYC Verification</TabsTrigger>
          <TabsTrigger value="bank" className="neon-glow">Bank Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-gradient">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex flex-col items-center gap-4 mb-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-2 border-primary/50">
                      {profileImage ? (
                        <AvatarImage src={profileImage} alt="User" />
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg" alt="User" />
                          <AvatarFallback className="text-2xl bg-primary/20">NU</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background neon-glow"
                      onClick={() => document.getElementById('profile-image')?.click()}
                    >
                      <Camera className="h-4 w-4" />
                      <Input 
                        id="profile-image" 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleProfileImageChange}
                      />
                    </Button>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">Neeraj User</h3>
                    <p className="text-muted-foreground">ID: N78349223</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input id="fullname" defaultValue="Neeraj User" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="user@neeraj.com" type="email" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" defaultValue="1990-01-01" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Main Street" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="Mumbai" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="Maharashtra" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" defaultValue="India" className="bg-background/50" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 neon-glow" onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="kyc">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-gradient">KYC Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-background/30 p-4 rounded-md space-y-2">
                <h3 className="font-medium">Verification Status</h3>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <p className="text-yellow-500">Pending Verification</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Please upload your identity documents to complete KYC verification. This helps us secure your account and comply with regulations.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Identity Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload Front Side of ID</p>
                    <p className="text-xs text-muted-foreground">Passport, Driver's License, or National ID</p>
                    <Input 
                      id="id-front" 
                      type="file" 
                      className="hidden" 
                      accept="image/jpeg, image/png, application/pdf"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      className="mt-2 neon-glow"
                      onClick={() => document.getElementById('id-front')?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload Back Side of ID</p>
                    <p className="text-xs text-muted-foreground">Passport, Driver's License, or National ID</p>
                    <Input 
                      id="id-back" 
                      type="file" 
                      className="hidden" 
                      accept="image/jpeg, image/png, application/pdf"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      className="mt-2 neon-glow"
                      onClick={() => document.getElementById('id-back')?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Address Verification</h3>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Upload Proof of Address</p>
                  <p className="text-xs text-muted-foreground">Utility Bill, Bank Statement (not older than 3 months)</p>
                  <Input 
                    id="address-proof" 
                    type="file" 
                    className="hidden" 
                    accept="image/jpeg, image/png, application/pdf"
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    className="mt-2 neon-glow"
                    onClick={() => document.getElementById('address-proof')?.click()}
                  >
                    Browse Files
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary/90 neon-glow">
                Submit KYC Documents
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="bank">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-gradient">Bank Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/10 p-4 rounded-md">
                <p className="text-sm">
                  Your bank details are used for processing withdrawals. Please ensure the information is accurate to avoid delays.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input id="bank-name" defaultValue="HDFC Bank" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-name">Account Holder Name</Label>
                  <Input id="account-name" defaultValue="Neeraj User" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <div className="flex gap-2">
                    <Input id="account-number" defaultValue="7892-3750-1594-2038" className="bg-background/50" />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      className="shrink-0 neon-glow"
                      onClick={handleCopyAccountNumber}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input id="ifsc" defaultValue="HDFC0001234" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-type">Account Type</Label>
                  <Input id="account-type" defaultValue="Savings" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input id="branch" defaultValue="Mumbai Main" className="bg-background/50" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary/90 neon-glow">
                Update Bank Details
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSection;
