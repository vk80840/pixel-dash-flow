
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Copy, ArrowUpFromLine, ArrowDownToLine, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DashboardSection: React.FC = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Referral link has been copied successfully",
      duration: 3000,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 animate-fade-in">
      {/* Profile Card */}
      <Card className="glass-card col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-gradient">Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24 border-2 border-primary/50">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback className="text-2xl bg-primary/20">NU</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-xl font-semibold">Neeraj User</h3>
            <p className="text-muted-foreground">user@neeraj.com</p>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="outline" className="bg-primary/20 text-primary-foreground">Active</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span>April 15, 2023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID</span>
              <span>N78349223</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full neon-glow" onClick={() => toast({
            title: "Coming Soon",
            description: "This feature is currently under development",
            duration: 3000,
          })}>
            Edit Profile
          </Button>
        </CardFooter>
      </Card>

      {/* Total Gain Card */}
      <Card className="glass-card col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-gradient">Total Gain</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">$8,945.60</h2>
            <p className="text-primary text-sm">+4.5% this month</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Direct Income</span>
              <span>$3,250.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Team Income</span>
              <span>$4,125.30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Referral Bonus</span>
              <span>$1,570.30</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full neon-glow">View Details</Button>
        </CardFooter>
      </Card>

      {/* Wallet Card */}
      <Card className="glass-card col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-gradient">Wallet</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">$12,365.75</h2>
            <p className="text-muted-foreground text-sm">Available Balance</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pending</span>
              <span>$820.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Deposited</span>
              <span>$25,000.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Withdrawn</span>
              <span>$13,455.25</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1 flex items-center gap-2 neon-glow">
            <ArrowDownToLine className="h-4 w-4" />
            <span>Deposit</span>
          </Button>
          <Button variant="outline" className="flex-1 flex items-center gap-2 neon-glow">
            <ArrowUpFromLine className="h-4 w-4" />
            <span>Withdraw</span>
          </Button>
        </CardFooter>
      </Card>

      {/* Referral System Card */}
      <Card className="glass-card col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-gradient">Referral System</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Referrals</span>
              <span>24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Referrals</span>
              <span>18</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Referral Earnings</span>
              <span>$1,570.30</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Referral Link</label>
            <div className="flex gap-2">
              <Input 
                value="https://neeraj.com/ref/user123" 
                readOnly 
                className="bg-background/50 text-sm"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => copyToClipboard("https://neeraj.com/ref/user123")}
                className="shrink-0 neon-glow"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full neon-glow">View Referral Stats</Button>
        </CardFooter>
      </Card>

      {/* Quick Navigation Card */}
      <Card className="glass-card col-span-1 md:col-span-2 lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-gradient">Quick Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <ArrowDownToLine className="h-6 w-6" />, label: 'Deposit Funds' },
              { icon: <ArrowUpFromLine className="h-6 w-6" />, label: 'Withdraw Funds' },
              { icon: <Users className="h-6 w-6" />, label: 'Team Overview' },
              { icon: <MessagesSquare className="h-6 w-6" />, label: 'Support Tickets' },
            ].map((item, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex flex-col items-center gap-2 h-auto py-6 neon-glow"
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-muted-foreground text-sm mb-4">
            Joined NEERAJ on April 15, 2023. Welcome to your personalized dashboard.
          </p>
          <Button variant="link" className="text-primary flex items-center gap-2 self-end">
            <span>View System Status</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardSection;
