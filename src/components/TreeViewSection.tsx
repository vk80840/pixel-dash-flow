
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronRight, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreeNode {
  id: string;
  name: string;
  level: number;
  active: boolean;
  joinDate: string;
  referrals: number;
  image?: string;
  children?: TreeNode[];
}

const TeamTreeNode: React.FC<{ node: TreeNode; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(level < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={cn(
      "relative",
      level === 0 ? "" : "ml-8 pl-4 border-l border-dashed border-border"
    )}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center gap-2 py-2">
          {hasChildren && (
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-6 w-6 p-0 rounded-full bg-background/50",
                  isOpen && "bg-primary/20"
                )}
              >
                <ChevronRight 
                  className={cn(
                    "h-4 w-4 transition-transform", 
                    isOpen && "rotate-90"
                  )} 
                />
              </Button>
            </CollapsibleTrigger>
          )}
          
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-md transition-colors",
            node.active ? "bg-primary/10 hover:bg-primary/20" : "bg-background/30 hover:bg-background/50"
          )}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={node.image || "/placeholder.svg"} alt={node.name} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {node.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{node.name}</span>
                <Badge 
                  variant="outline" 
                  className={node.active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}
                >
                  {node.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-4">
                <span>Joined: {new Date(node.joinDate).toLocaleDateString()}</span>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{node.referrals}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {hasChildren && (
          <CollapsibleContent>
            <div className="space-y-1">
              {node.children?.map((child) => (
                <TeamTreeNode key={child.id} node={child} level={level + 1} />
              ))}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    </div>
  );
};

const TreeViewSection: React.FC = () => {
  // Sample tree data
  const treeData: TreeNode = {
    id: 'N78349223',
    name: 'Neeraj User',
    level: 0,
    active: true,
    joinDate: '2023-04-15',
    referrals: 5,
    children: [
      {
        id: 'N78349224',
        name: 'Rahul Sharma',
        level: 1,
        active: true,
        joinDate: '2023-05-10',
        referrals: 3,
        children: [
          {
            id: 'N78349229',
            name: 'Neha Gupta',
            level: 2,
            active: false,
            joinDate: '2023-07-05',
            referrals: 0,
          },
          {
            id: 'N78349230',
            name: 'Vikram Kumar',
            level: 2,
            active: true,
            joinDate: '2023-07-18',
            referrals: 1,
            children: [
              {
                id: 'N78349235',
                name: 'Rajesh Khanna',
                level: 3,
                active: true,
                joinDate: '2023-09-15',
                referrals: 0,
              },
            ],
          },
        ],
      },
      {
        id: 'N78349225',
        name: 'Priya Patel',
        level: 1,
        active: true,
        joinDate: '2023-05-15',
        referrals: 2,
        children: [
          {
            id: 'N78349231',
            name: 'Meena Reddy',
            level: 2,
            active: true,
            joinDate: '2023-08-03',
            referrals: 0,
          },
          {
            id: 'N78349232',
            name: 'Suresh Menon',
            level: 2,
            active: true,
            joinDate: '2023-08-11',
            referrals: 0,
          },
        ],
      },
      {
        id: 'N78349226',
        name: 'Amit Singh',
        level: 1,
        active: false,
        joinDate: '2023-06-02',
        referrals: 0,
      },
      {
        id: 'N78349227',
        name: 'Sunita Verma',
        level: 1,
        active: true,
        joinDate: '2023-06-10',
        referrals: 2,
        children: [
          {
            id: 'N78349233',
            name: 'Kavita Joshi',
            level: 2,
            active: true,
            joinDate: '2023-08-25',
            referrals: 0,
          },
          {
            id: 'N78349234',
            name: 'Deepak Nair',
            level: 2,
            active: true,
            joinDate: '2023-09-02',
            referrals: 0,
          },
        ],
      },
      {
        id: 'N78349228',
        name: 'Karan Malhotra',
        level: 1,
        active: true,
        joinDate: '2023-06-22',
        referrals: 0,
      },
    ],
  };

  return (
    <div className="p-6 animate-fade-in">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-gradient">Team Structure</CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <div className="border p-4 rounded-lg bg-background/10">
            <TeamTreeNode node={treeData} level={0} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreeViewSection;
