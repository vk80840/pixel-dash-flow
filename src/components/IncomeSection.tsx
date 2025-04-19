
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { ArrowUp, Wallet, Users, Gift } from 'lucide-react';

// Chart data
const monthlyData = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 1800 },
  { name: 'Mar', amount: 2400 },
  { name: 'Apr', amount: 2000 },
  { name: 'May', amount: 2800 },
  { name: 'Jun', amount: 3600 },
  { name: 'Jul', amount: 3200 },
  { name: 'Aug', amount: 4000 },
  { name: 'Sep', amount: 3800 },
  { name: 'Oct', amount: 4200 },
  { name: 'Nov', amount: 4800 },
  { name: 'Dec', amount: 5400 },
];

const weeklyData = [
  { name: 'Mon', direct: 180, team: 240, referral: 130 },
  { name: 'Tue', direct: 200, team: 300, referral: 120 },
  { name: 'Wed', direct: 250, team: 350, referral: 150 },
  { name: 'Thu', direct: 220, team: 320, referral: 140 },
  { name: 'Fri', direct: 300, team: 400, referral: 180 },
  { name: 'Sat', direct: 270, team: 380, referral: 160 },
  { name: 'Sun', direct: 190, team: 270, referral: 110 },
];

const incomeSourceData = [
  { name: 'Direct Income', value: 3250, color: '#9b87f5' },
  { name: 'Team Income', value: 4125, color: '#7E69AB' },
  { name: 'Referral Bonus', value: 1570, color: '#6E59A5' },
];

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5'];

// Transaction data
const transactions = [
  { id: 'TX78392', date: '2023-10-15', type: 'Direct Commission', amount: 350.00, status: 'Completed' },
  { id: 'TX78385', date: '2023-10-12', type: 'Team Bonus', amount: 175.50, status: 'Completed' },
  { id: 'TX78379', date: '2023-10-08', type: 'Referral Bonus', amount: 120.00, status: 'Completed' },
  { id: 'TX78364', date: '2023-10-05', type: 'Direct Commission', amount: 300.00, status: 'Completed' },
  { id: 'TX78355', date: '2023-10-01', type: 'Team Bonus', amount: 220.75, status: 'Completed' },
  { id: 'TX78348', date: '2023-09-28', type: 'Referral Bonus', amount: 80.00, status: 'Completed' },
  { id: 'TX78339', date: '2023-09-25', type: 'Direct Commission', amount: 275.00, status: 'Completed' },
  { id: 'TX78330', date: '2023-09-21', type: 'Team Bonus', amount: 190.25, status: 'Completed' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 p-3 border border-border rounded-md shadow-md">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-primary">{`$${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};

const MultiDataTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 p-3 border border-border rounded-md shadow-md">
        <p className="font-medium mb-1">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: $${entry.value.toFixed(2)}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const IncomeSection: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gradient">Direct Income</CardTitle>
            <Wallet className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-3xl font-bold">$3,250.00</p>
              <p className="text-xs flex items-center text-green-500">
                <ArrowUp className="h-3 w-3 mr-1" />
                12% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gradient">Team Income</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-3xl font-bold">$4,125.30</p>
              <p className="text-xs flex items-center text-green-500">
                <ArrowUp className="h-3 w-3 mr-1" />
                8% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gradient">Referral Bonus</CardTitle>
            <Gift className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-3xl font-bold">$1,570.30</p>
              <p className="text-xs flex items-center text-green-500">
                <ArrowUp className="h-3 w-3 mr-1" />
                15% from last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-gradient">Income Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-background/30">
              <TabsTrigger value="monthly" className="neon-glow">Monthly Overview</TabsTrigger>
              <TabsTrigger value="weekly" className="neon-glow">Weekly Breakdown</TabsTrigger>
              <TabsTrigger value="sources" className="neon-glow">Income Sources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monthly">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#8E9196' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#8E9196' }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#9b87f5" 
                      fillOpacity={1} 
                      fill="url(#colorAmount)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="weekly">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#8E9196' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#8E9196' }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />
                    <Tooltip content={<MultiDataTooltip />} />
                    <Legend />
                    <Bar dataKey="direct" name="Direct Income" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="team" name="Team Income" fill="#7E69AB" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="referral" name="Referral Bonus" fill="#6E59A5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="sources">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incomeSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {incomeSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => `$${value}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-gradient">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeSection;
