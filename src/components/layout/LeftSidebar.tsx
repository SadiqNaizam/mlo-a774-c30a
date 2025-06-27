import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutGrid,
  Package,
  ShoppingCart,
  Users,
  BarChart,
  Settings,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const LeftSidebar: React.FC = () => {
  console.log('LeftSidebar loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
      isActive ? 'bg-muted text-primary' : 'text-muted-foreground'
    }`;

  const navItems = [
    { to: '/', icon: LayoutGrid, label: 'Dashboard' },
    { to: '/products', icon: Package, label: 'Products' },
    { to: '/orders', icon: ShoppingCart, label: 'Orders', badgeCount: 3 },
    { to: '/customers', icon: Users, label: 'Customers' },
    { to: '/analytics', icon: BarChart, label: 'Analytics' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col gap-2 p-4">
        <div className="flex h-14 items-center border-b px-2 lg:h-[60px] lg:px-4 mb-2">
            <Link to="/" className="flex items-center gap-2 font-semibold">
                <LayoutGrid className="h-6 w-6 text-primary" />
                <span className="">ShopSmart</span>
            </Link>
        </div>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end className={navLinkClasses}>
            <item.icon className="h-4 w-4" />
            {item.label}
            {item.badgeCount && (
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {item.badgeCount}
              </Badge>
            )}
          </NavLink>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col gap-2 p-4">
        <Tooltip>
          <TooltipTrigger asChild>
            {/* Using a placeholder link as no settings page route is defined */}
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default LeftSidebar;