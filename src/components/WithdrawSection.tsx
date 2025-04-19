
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { InfoIcon } from 'lucide-react';

const WithdrawSection: React.FC = () => {
  const { toast } = useToast();
  const [withdrawMethod, setWithdrawMethod] = useState<string>('btc');
  const [amount, setAmount] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseFloat(amount) > 12365.75) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance to withdraw this amount.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: "Withdrawal request submitted",
      description: "Your withdrawal request has been received and will be processed within 24 hours.",
      duration: 3000,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 animate-fade-in">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-gradient">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="text-center py-8">
            <h2 className="text-4xl font-bold">$12,365.75</h2>
            <p className="text-muted-foreground mt-2">Available for Withdrawal</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Pending Withdrawals</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Total Withdrawn</span>
              <span>$13,455.25</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Daily Limit</span>
              <span>$5,000.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Limit</span>
              <span>$50,000.00</span>
            </div>
          </div>

          <div className="bg-background/30 p-4 rounded-md flex gap-3">
            <InfoIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p>Withdrawals are processed within 24 hours. Minimum withdrawal amount is $100.</p>
              <p className="mt-2">All withdrawal requests are subject to security verification.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-gradient">Withdraw Funds</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-method">Withdrawal Method</Label>
              <Select 
                value={withdrawMethod} 
                onValueChange={setWithdrawMethod}
              >
                <SelectTrigger id="withdraw-method" className="bg-background/50">
                  <SelectValue placeholder="Select withdrawal method" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="usdt">Tether (USDT)</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Amount</Label>
              <Input 
                id="withdraw-amount" 
                type="number" 
                placeholder="Enter amount" 
                className="bg-background/50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="100"
                required
              />
              <p className="text-xs text-muted-foreground">Minimum withdrawal: $100</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdraw-address">{withdrawMethod === 'bank' ? 'Bank Account Details' : 'Wallet Address'}</Label>
              <Input 
                id="withdraw-address" 
                placeholder={withdrawMethod === 'bank' ? 'Enter account details' : 'Enter wallet address'} 
                className="bg-background/50"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {withdrawMethod !== 'bank' && (
              <div className="space-y-2">
                <Label htmlFor="withdraw-network">Network</Label>
                <Select defaultValue="main">
                  <SelectTrigger id="withdraw-network" className="bg-background/50">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="main">Main Network</SelectItem>
                    <SelectItem value="bsc">BSC</SelectItem>
                    <SelectItem value="erc20">ERC20</SelectItem>
                    <SelectItem value="trc20">TRC20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="withdraw-note">Note (Optional)</Label>
              <Input 
                id="withdraw-note" 
                placeholder="Add a note to this withdrawal" 
                className="bg-background/50"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 neon-glow" onClick={handleSubmit}>
            Submit Withdrawal Request
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WithdrawSection;
