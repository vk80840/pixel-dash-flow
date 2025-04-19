
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Search, UserCheck, UserX } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'inactive';
  referrals: number;
  earnings: number;
}

const TeamSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const teamMembers: TeamMember[] = [
    { id: 'N78349224', name: 'Rahul Sharma', email: 'rahul@example.com', joinDate: '2023-05-10', status: 'active', referrals: 12, earnings: 2450 },
    { id: 'N78349225', name: 'Priya Patel', email: 'priya@example.com', joinDate: '2023-05-15', status: 'active', referrals: 8, earnings: 1680 },
    { id: 'N78349226', name: 'Amit Singh', email: 'amit@example.com', joinDate: '2023-06-02', status: 'inactive', referrals: 3, earnings: 450 },
    { id: 'N78349227', name: 'Sunita Verma', email: 'sunita@example.com', joinDate: '2023-06-10', status: 'active', referrals: 15, earnings: 3200 },
    { id: 'N78349228', name: 'Karan Malhotra', email: 'karan@example.com', joinDate: '2023-06-22', status: 'active', referrals: 7, earnings: 1350 },
    { id: 'N78349229', name: 'Neha Gupta', email: 'neha@example.com', joinDate: '2023-07-05', status: 'inactive', referrals: 0, earnings: 0 },
    { id: 'N78349230', name: 'Vikram Kumar', email: 'vikram@example.com', joinDate: '2023-07-18', status: 'active', referrals: 9, earnings: 1850 },
    { id: 'N78349231', name: 'Meena Reddy', email: 'meena@example.com', joinDate: '2023-08-03', status: 'active', referrals: 6, earnings: 1200 },
  ];

  const activeMembers = teamMembers.filter(member => member.status === 'active');
  const inactiveMembers = teamMembers.filter(member => member.status === 'inactive');

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-gradient">Team Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32">
              <p className="text-4xl font-bold">{teamMembers.length}</p>
              <p className="text-muted-foreground">Total Team Members</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-gradient flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-500" />
              <span>Active Members</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32">
              <p className="text-4xl font-bold">{activeMembers.length}</p>
              <p className="text-muted-foreground">Active Team Members</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-gradient flex items-center gap-2">
              <UserX className="h-5 w-5 text-red-500" />
              <span>Inactive Members</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-32">
              <p className="text-4xl font-bold">{inactiveMembers.length}</p>
              <p className="text-muted-foreground">Inactive Team Members</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-gradient">Team Members</CardTitle>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, email or ID..."
                className="pl-8 bg-background/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 bg-background/30">
              <TabsTrigger value="all" className="neon-glow">All Members</TabsTrigger>
              <TabsTrigger value="active" className="neon-glow">Active</TabsTrigger>
              <TabsTrigger value="inactive" className="neon-glow">Inactive</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Referrals</TableHead>
                      <TableHead className="text-right">Earnings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map(member => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.id}</TableCell>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={member.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}
                            >
                              {member.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>{member.referrals}</TableCell>
                          <TableCell className="text-right">${member.earnings.toFixed(2)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          No members found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="active">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Referrals</TableHead>
                      <TableHead className="text-right">Earnings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeMembers
                      .filter(member => 
                        member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        member.id.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map(member => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.id}</TableCell>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell>{member.referrals}</TableCell>
                          <TableCell className="text-right">${member.earnings.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="inactive">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Referrals</TableHead>
                      <TableHead className="text-right">Earnings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inactiveMembers
                      .filter(member => 
                        member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        member.id.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map(member => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.id}</TableCell>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell>{member.referrals}</TableCell>
                          <TableCell className="text-right">${member.earnings.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamSection;
