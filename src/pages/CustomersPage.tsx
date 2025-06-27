import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from 'lucide-react';

// Define the type for a customer
type Customer = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  status: 'Active' | 'Inactive';
  totalOrders: number;
  totalSpent: number;
};

// Mock data for the customers table
const mockCustomers: Customer[] = [
  { id: 'CUST001', name: 'Alice Johnson', email: 'alice.j@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704a', status: 'Active', totalOrders: 12, totalSpent: 1250.75 },
  { id: 'CUST002', name: 'Bob Smith', email: 'bob.smith@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704b', status: 'Active', totalOrders: 5, totalSpent: 450.00 },
  { id: 'CUST003', name: 'Charlie Brown', email: 'charlie.b@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704c', status: 'Inactive', totalOrders: 1, totalSpent: 35.50 },
  { id: 'CUST004', name: 'Diana Prince', email: 'diana.p@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', status: 'Active', totalOrders: 25, totalSpent: 3200.00 },
  { id: 'CUST005', name: 'Ethan Hunt', email: 'ethan.h@example.com', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', status: 'Active', totalOrders: 8, totalSpent: 890.20 },
];

const CustomersPage = () => {
  console.log('Customers Page loaded');
  const [customers] = useState<Customer[]>(mockCustomers);

  // A simple formatter for currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:pl-60"> {/* Adjusted for sidebar width */}
        <Header />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="my-4">
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>
                A directory of all customers who have made a purchase.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pb-4">
                <Input
                  placeholder="Search customers by name or email..."
                  className="max-w-sm"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total Orders</TableHead>
                    <TableHead className="text-right">Total Spent</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{customer.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{customer.totalOrders}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(customer.totalSpent)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="outline" size="sm">
                          View History
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CustomersPage;