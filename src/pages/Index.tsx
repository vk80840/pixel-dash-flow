
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import DashboardSection from '@/components/DashboardSection';
import DepositSection from '@/components/DepositSection';
import WithdrawSection from '@/components/WithdrawSection';
import ProfileSection from '@/components/ProfileSection';
import TeamSection from '@/components/TeamSection';
import TreeViewSection from '@/components/TreeViewSection';
import IncomeSection from '@/components/IncomeSection';
import SupportSection from '@/components/SupportSection';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Close sidebar by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen bg-neeraj-dark text-white overflow-x-hidden">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex h-full pt-16">
        <Sidebar isOpen={isSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-y-auto transition-all duration-300 ml-0 md:ml-20" style={{ 
          marginLeft: isSidebarOpen ? (window.innerWidth >= 768 ? '16rem' : '0') : '0'
        }}>
          {activeTab === 'dashboard' && <DashboardSection />}
          {activeTab === 'deposit' && <DepositSection />}
          {activeTab === 'withdraw' && <WithdrawSection />}
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'team' && <TeamSection />}
          {activeTab === 'tree-view' && <TreeViewSection />}
          {activeTab === 'income' && <IncomeSection />}
          {activeTab === 'support' && <SupportSection />}
        </main>
      </div>
    </div>
  );
};

export default Index;
