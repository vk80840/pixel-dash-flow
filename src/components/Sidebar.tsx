
import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  User, 
  Users, 
  GitBranchPlus, 
  LineChart, 
  MessagesSquare, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', id: 'dashboard' },
  { icon: <ArrowDownToLine className="h-5 w-5" />, label: 'Deposit', id: 'deposit' },
  { icon: <ArrowUpFromLine className="h-5 w-5" />, label: 'Withdraw', id: 'withdraw' },
  { icon: <User className="h-5 w-5" />, label: 'Profile', id: 'profile' },
  { icon: <Users className="h-5 w-5" />, label: 'Team', id: 'team' },
  { icon: <GitBranchPlus className="h-5 w-5" />, label: 'Tree View', id: 'tree-view' },
  { icon: <LineChart className="h-5 w-5" />, label: 'Income', id: 'income' },
  { icon: <MessagesSquare className="h-5 w-5" />, label: 'Support', id: 'support' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab }) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 w-64 bg-gradient-dark neo-blur transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
      )}
    >
      <div className="flex flex-col h-full p-4 gap-2">
        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center justify-start gap-4 px-4 py-2 h-12 text-sidebar-foreground neon-glow transition-all",
                !isOpen && "md:justify-center md:px-0",
                activeTab === item.id
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "hover:bg-white/5 border-l-4 border-transparent"
              )}
            >
              {item.icon}
              {(isOpen || !isOpen && window.innerWidth < 768) && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>
        
        <Button
          variant="ghost"
          className={cn(
            "flex items-center justify-start gap-4 px-4 py-2 h-12 text-sidebar-foreground neon-glow hover:bg-white/5 border-l-4 border-transparent transition-all text-destructive",
            !isOpen && "md:justify-center md:px-0"
          )}
        >
          <LogOut className="h-5 w-5" />
          {(isOpen || !isOpen && window.innerWidth < 768) && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
