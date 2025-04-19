import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Copy, QrCode, Upload } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const DepositSection: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('btc');
  const [amount, setAmount] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      description: "Address has been copied successfully",
      duration: 3000,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Deposit request submitted", {
      description: "Your deposit request has been received and will be processed soon.",
      duration: 3000,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 animate-fade-in">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-gradient">Deposit via Cryptocurrency</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="h-48 w-48 bg-white p-4 rounded-lg flex items-center justify-center">
            <QrCode className="h-full w-full text-neeraj-dark" />
          </div>

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">BTC Address</Label>
              <div className="flex gap-2">
                <Input 
                  id="address" 
                  value="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" 
                  readOnly 
                  className="bg-background/50"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  className="shrink-0 neon-glow"
                  onClick={() => handleCopy("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Important Note</Label>
              <div className="text-sm text-muted-foreground p-4 bg-background/30 rounded-md">
                <p>Please ensure you're sending only BTC to this address. Sending any other cryptocurrency may result in permanent loss of funds.</p>
                <p className="mt-2">After sending, please upload a screenshot of your transaction for faster processing.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-gradient">Deposit Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="method">Payment Method</Label>
              <Select 
                value={selectedMethod} 
                onValueChange={setSelectedMethod}
              >
                <SelectTrigger id="method" className="bg-background/50">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="usdt">Tether (USDT)</SelectItem>
                  <SelectItem value="bnb">Binance Coin (BNB)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="Enter amount" 
                className="bg-background/50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="100"
                required
              />
              <p className="text-xs text-muted-foreground">Minimum deposit: $100</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proof">Proof of Payment</Label>
              <div className="flex flex-col gap-2">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Upload screenshot of transaction</p>
                  <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
                  <Input 
                    id="proof" 
                    type="file" 
                    className="hidden" 
                    accept="image/jpeg, image/png, application/pdf"
                    onChange={handleFileChange}
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    className="mt-2 neon-glow"
                    onClick={() => document.getElementById('proof')?.click()}
                  >
                    Browse Files
                  </Button>
                </div>
                {file && (
                  <p className="text-sm text-primary">File selected: {file.name}</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 neon-glow" onClick={handleSubmit}>
            Submit Deposit Request
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DepositSection;
