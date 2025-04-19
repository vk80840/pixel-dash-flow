
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Plus, Paperclip, MessageSquare, Search } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'closed' | 'pending';
  date: string;
  category: string;
  messages: Message[];
}

interface Message {
  id: string;
  sender: 'user' | 'support';
  name: string;
  avatar?: string;
  content: string;
  timestamp: string;
}

const SupportSection: React.FC = () => {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample ticket data
  const tickets: Ticket[] = [
    {
      id: 'TKT-10045',
      subject: 'Withdrawal Pending',
      status: 'open',
      date: '2023-10-12',
      category: 'Payment',
      messages: [
        {
          id: 'm1',
          sender: 'user',
          name: 'Neeraj User',
          content: 'My withdrawal request has been pending for 3 days now. Could you please check the status?',
          timestamp: '2023-10-12 14:35',
        },
        {
          id: 'm2',
          sender: 'support',
          name: 'Support Agent',
          avatar: '/placeholder.svg',
          content: 'Thank you for reaching out. I will check the status of your withdrawal request and get back to you as soon as possible.',
          timestamp: '2023-10-12 15:42',
        },
        {
          id: 'm3',
          sender: 'support',
          name: 'Support Agent',
          avatar: '/placeholder.svg',
          content: 'I've checked your withdrawal request. It's currently under processing and should be completed within 24 hours. We apologize for the delay.',
          timestamp: '2023-10-12 16:30',
        },
        {
          id: 'm4',
          sender: 'user',
          name: 'Neeraj User',
          content: 'Thank you for checking. I'll wait for the next 24 hours.',
          timestamp: '2023-10-12 17:05',
        },
      ],
    },
    {
      id: 'TKT-10039',
      subject: 'Referral Bonus Not Received',
      status: 'pending',
      date: '2023-10-08',
      category: 'Referral',
      messages: [
        {
          id: 'm1',
          sender: 'user',
          name: 'Neeraj User',
          content: 'I referred a friend who joined using my link, but I did not receive the referral bonus.',
          timestamp: '2023-10-08 09:22',
        },
        {
          id: 'm2',
          sender: 'support',
          name: 'Support Agent',
          avatar: '/placeholder.svg',
          content: 'Thank you for bringing this to our attention. Could you please provide the username or ID of the person you referred?',
          timestamp: '2023-10-08 10:15',
        },
        {
          id: 'm3',
          sender: 'user',
          name: 'Neeraj User',
          content: 'Yes, their username is Rahul Sharma with ID N78349224.',
          timestamp: '2023-10-08 11:03',
        },
        {
          id: 'm4',
          sender: 'support',
          name: 'Support Agent',
          avatar: '/placeholder.svg',
          content: 'Thank you for providing the details. We'll investigate this and update you soon.',
          timestamp: '2023-10-08 11:47',
        },
      ],
    },
    {
      id: 'TKT-10032',
      subject: 'Account Access Issue',
      status: 'closed',
      date: '2023-10-01',
      category: 'Account',
      messages: [
        {
          id: 'm1',
          sender: 'user',
          name: 'Neeraj User',
          content: 'I was unable to log in to my account for several hours yesterday. Is there a system issue?',
          timestamp: '2023-10-01 08:15',
        },
        {
          id: 'm2',
          sender: 'support',
          name: 'Support Agent',
          avatar: '/placeholder.svg',
          content: 'We apologize for the inconvenience. We were performing system maintenance yesterday from 2 PM to 4 PM. Are you able to access your account now?',
          timestamp: '2023-10-01 09:30',
        },
        {
          id: 'm3',
          sender: 'user',
          name: 'Neeraj User',
          content: 'Yes, I can access my account now. Thank you for the clarification.',
          timestamp: '2023-10-01 10:45',
        },
        {
          id: 'm4',
          sender: 'support',
          name: 'Support Agent',
          avatar: '/placeholder.svg',
          content: 'You're welcome. We'll try to give more advance notice for future maintenance. Is there anything else I can help you with?',
          timestamp: '2023-10-01 11:20',
        },
        {
          id: 'm5',
          sender: 'user',
          name: 'Neeraj User',
          content: 'No, that's all. Thank you for your help.',
          timestamp: '2023-10-01 11:35',
        },
        {
          id: 'm6',
          sender: 'support',
          name: 'Support Agent',
          avatar: '/placeholder.svg',
          content: 'You're welcome. I'm closing this ticket now. Feel free to open a new one if you need further assistance.',
          timestamp: '2023-10-01 11:40',
        },
      ],
    },
  ];

  const filteredTickets = tickets.filter(ticket => 
    ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !category || !message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: "Ticket submitted",
      description: "Your support ticket has been successfully submitted",
      duration: 3000,
    });
    
    setSubject('');
    setCategory('');
    setMessage('');
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to support",
      duration: 3000,
    });
    
    setChatMessage('');
  };

  return (
    <div className="p-6 animate-fade-in">
      <Tabs defaultValue="tickets" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 bg-background/30">
          <TabsTrigger value="tickets" className="neon-glow">My Tickets</TabsTrigger>
          <TabsTrigger value="chat" className="neon-glow">Live Chat</TabsTrigger>
          <TabsTrigger value="faq" className="neon-glow">FAQs</TabsTrigger>
          <TabsTrigger value="new-ticket" className="neon-glow">New Ticket</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tickets">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-gradient">Support Tickets</CardTitle>
              <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tickets..."
                    className="pl-8 bg-background/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="shrink-0 neon-glow" onClick={() => {
                  document.querySelector('[data-state="inactive"][data-value="new-ticket"]')?.click();
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <div 
                      key={ticket.id} 
                      className="border rounded-lg p-4 hover:bg-background/20 transition-colors cursor-pointer"
                      onClick={() => {
                        toast({
                          title: "Viewing ticket",
                          description: `Viewing details for ticket ${ticket.id}`,
                          duration: 3000,
                        });
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant="outline" 
                            className={
                              ticket.status === 'open' 
                                ? 'bg-green-500/20 text-green-500' 
                                : ticket.status === 'pending' 
                                ? 'bg-yellow-500/20 text-yellow-500' 
                                : 'bg-red-500/20 text-red-500'
                            }
                          >
                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{ticket.id}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(ticket.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-medium mb-1">{ticket.subject}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Category: {ticket.category}</span>
                        <span className="text-sm text-muted-foreground">
                          {ticket.messages.length} message{ticket.messages.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                    <h3 className="font-medium text-lg mb-2">No tickets found</h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any support tickets matching your search.
                    </p>
                    <Button
                      variant="outline"
                      className="neon-glow"
                      onClick={() => {
                        document.querySelector('[data-state="inactive"][data-value="new-ticket"]')?.click();
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Ticket
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chat">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-gradient">Live Support Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] border rounded-lg p-4 mb-4 overflow-y-auto flex flex-col gap-4">
                <div className="self-center py-4">
                  <p className="text-center text-sm text-muted-foreground">Today, 15:30</p>
                </div>
                
                <div className="flex flex-col gap-2 max-w-[80%] self-start">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="Support" />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Support Agent</span>
                  </div>
                  <div className="bg-background/30 p-3 rounded-lg rounded-tl-none">
                    <p>Hello! How can I assist you today?</p>
                  </div>
                  <span className="text-xs text-muted-foreground">15:30</span>
                </div>
                
                <div className="flex flex-col gap-2 max-w-[80%] self-end">
                  <div className="flex items-center gap-2 self-end">
                    <span className="text-sm font-medium">You</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="You" />
                      <AvatarFallback>NU</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="bg-primary/20 p-3 rounded-lg rounded-tr-none">
                    <p>I have a question about my referral bonus. It seems to be delayed.</p>
                  </div>
                  <span className="text-xs text-muted-foreground self-end">15:32</span>
                </div>
                
                <div className="flex flex-col gap-2 max-w-[80%] self-start">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="Support" />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Support Agent</span>
                  </div>
                  <div className="bg-background/30 p-3 rounded-lg rounded-tl-none">
                    <p>I'd be happy to look into that for you. Could you please provide your referral code and the date when your friend signed up?</p>
                  </div>
                  <span className="text-xs text-muted-foreground">15:35</span>
                </div>
              </div>
              
              <form onSubmit={handleSendChatMessage} className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  className="flex-1 bg-background/50"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <Button variant="outline" size="icon" type="button" className="neon-glow">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 neon-glow">
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-gradient">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I earn referral commissions?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      You can earn referral commissions by sharing your unique referral link with friends and colleagues. When they sign up using your link, you'll receive a commission for their activities on the platform.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      The commission structure is as follows:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-muted-foreground">
                      <li>Level 1 (Direct Referrals): 10% of their earnings</li>
                      <li>Level 2: 5% of their earnings</li>
                      <li>Level 3: 2% of their earnings</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>How long do withdrawals take to process?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Withdrawal processing times depend on the method you choose:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-muted-foreground">
                      <li>Cryptocurrency: 1-24 hours</li>
                      <li>Bank Transfer: 3-5 business days</li>
                    </ul>
                    <p className="mt-2 text-muted-foreground">
                      Please note that first-time withdrawals may require additional verification which can add 24-48 hours to the processing time.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>What is the team structure and how does it work?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Our team structure is a binary system where each member can have two direct referrals under them, forming a left team and a right team. As your team grows, you earn commissions based on the weaker leg's performance.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Team bonuses are calculated weekly based on your team's total volume. The more balanced your left and right teams are, the higher your potential earnings.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I complete KYC verification?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      To complete KYC verification, follow these steps:
                    </p>
                    <ol className="list-decimal list-inside mt-2 text-muted-foreground">
                      <li>Go to the Profile section in your dashboard</li>
                      <li>Select the KYC Verification tab</li>
                      <li>Upload a clear photo of your government-issued ID (passport, driver's license, or national ID)</li>
                      <li>Upload a proof of address document (utility bill, bank statement, etc. not older than 3 months)</li>
                      <li>Submit your documents for review</li>
                    </ol>
                    <p className="mt-2 text-muted-foreground">
                      Verification typically takes 24-48 hours to complete.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>What are the minimum and maximum deposit/withdrawal amounts?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      The minimum and maximum amounts are as follows:
                    </p>
                    <p className="mt-2 text-muted-foreground font-medium">Deposits:</p>
                    <ul className="list-disc list-inside mt-1 mb-2 text-muted-foreground">
                      <li>Minimum: $100</li>
                      <li>Maximum: No upper limit</li>
                    </ul>
                    <p className="mt-2 text-muted-foreground font-medium">Withdrawals:</p>
                    <ul className="list-disc list-inside mt-1 text-muted-foreground">
                      <li>Minimum: $100</li>
                      <li>Maximum: $5,000 per day / $50,000 per month</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new-ticket">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-gradient">Submit a New Support Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ticket-subject">Subject</Label>
                  <Input 
                    id="ticket-subject" 
                    placeholder="Briefly describe your issue" 
                    className="bg-background/50"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ticket-category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="ticket-category" className="bg-background/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="account">Account</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ticket-message">Message</Label>
                  <Textarea 
                    id="ticket-message" 
                    placeholder="Describe your issue in detail" 
                    className="min-h-[150px] bg-background/50"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ticket-attachment">Attachment (Optional)</Label>
                  <div className="flex flex-col gap-2">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center flex flex-col items-center gap-2">
                      <Paperclip className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload a file to help explain your issue</p>
                      <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, PDF (Max 5MB)</p>
                      <Input 
                        id="ticket-attachment" 
                        type="file" 
                        className="hidden" 
                        accept="image/jpeg, image/png, application/pdf"
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        className="mt-2 neon-glow"
                        onClick={() => document.getElementById('ticket-attachment')?.click()}
                      >
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 neon-glow" onClick={handleSubmitTicket}>
                Submit Ticket
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportSection;
