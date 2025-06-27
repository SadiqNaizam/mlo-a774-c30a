import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Package,
  ShoppingCart,
  UserPlus,
  Users,
} from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

// Custom Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import MetricCard from '@/components/MetricCard';
import ActivityFeedItem from '@/components/ActivityFeedItem';

// shadcn/ui Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Placeholder data
const salesChartData = [
  { month: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
  { month: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
];

const recentOrders = [
  { name: 'Liam Johnson', email: 'liam@example.com', total: '$250.00', status: 'Delivered' },
  { name: 'Olivia Smith', email: 'olivia@example.com', total: '$150.00', status: 'Shipped' },
  { name: 'Noah Williams', email: 'noah@example.com', total: '$350.00', status: 'Processing' },
  { name: 'Emma Brown', email: 'emma@example.com', total: '$450.00', status: 'Delivered' },
  { name: 'Ava Jones', email: 'ava@example.com', total: '$550.00', status: 'Canceled' },
];

const DashboardOverview = () => {
  console.log('DashboardOverview loaded');

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60 w-full">
        <Header />
        <main className="flex-1 grid auto-rows-max gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* Metric Cards */}
          <section className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <MetricCard
              title="Total Revenue"
              value="$45,231.89"
              change={20.1}
              icon={DollarSign}
            />
            <MetricCard
              title="Subscriptions"
              value="+2350"
              change={180.1}
              icon={Users}
            />
            <MetricCard
              title="Sales"
              value="+12,234"
              change={19}
              icon={CreditCard}
            />
            <MetricCard
              title="Active Now"
              value="+573"
              change={-2.5}
              icon={Activity}
            />
          </section>

          {/* Main Content Grid */}
          <section className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {/* Recent Orders Table */}
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    An overview of your most recent sales.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link to="/orders">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">{order.name}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {order.email}
                          </div>
                        </TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              order.status === 'Delivered' ? 'default' :
                              order.status === 'Processing' ? 'secondary' : 'destructive'
                            }
                            className="capitalize"
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recent Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <ActivityFeedItem
                  icon={<ShoppingCart />}
                  text="You have a new order #12345."
                  timestamp="5m ago"
                />
                <ActivityFeedItem
                  icon={<UserPlus />}
                  text="A new customer has registered."
                  timestamp="1h ago"
                />
                <ActivityFeedItem
                  icon={<Package />}
                  text="Product 'Classic Tee' is low on stock."
                  timestamp="3h ago"
                />
                <ActivityFeedItem
                  icon={<ShoppingCart />}
                  text="You have a new order #12344."
                  timestamp="Yesterday"
                />
              </CardContent>
            </Card>
          </section>
          
          {/* Sales Chart */}
          <section>
            <Card>
              <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>A chart showing sales over the last 6 months.</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={salesChartData}>
                          <XAxis
                              dataKey="month"
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                          />
                          <YAxis
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={false}
                              tickFormatter={(value) => `$${value}`}
                          />
                          <Bar
                              dataKey="total"
                              fill="currentColor"
                              radius={[4, 4, 0, 0]}
                              className="fill-primary"
                          />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
            </Card>
          </section>

        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardOverview;