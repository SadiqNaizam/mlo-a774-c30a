import React, { useState, useEffect } from 'react';
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
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MoreHorizontal, ListFilter } from 'lucide-react';

// Define the Order type
type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
type Order = {
  id: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  total: number;
};

// Mock data for the orders table
const initialOrders: Order[] = [
  { id: 'ORD001', customerName: 'Alice Johnson', date: '2023-10-26', status: 'Delivered', total: 150.00 },
  { id: 'ORD002', customerName: 'Bob Williams', date: '2023-10-25', status: 'Shipped', total: 75.50 },
  { id: 'ORD003', customerName: 'Charlie Brown', date: '2023-10-24', status: 'Processing', total: 200.25 },
  { id: 'ORD004', customerName: 'Diana Miller', date: '2023-10-23', status: 'Delivered', total: 300.00 },
  { id: 'ORD005', customerName: 'Ethan Davis', date: '2023-10-22', status: 'Cancelled', total: 50.00 },
  { id: 'ORD006', customerName: 'Fiona Garcia', date: '2023-10-21', status: 'Shipped', total: 120.00 },
  { id: 'ORD007', customerName: 'George Rodriguez', date: '2023-10-20', status: 'Processing', total: 85.75 },
];

const getBadgeVariant = (status: OrderStatus) => {
  switch (status) {
    case 'Processing':
      return 'secondary';
    case 'Shipped':
      return 'outline';
    case 'Delivered':
      return 'default';
    case 'Cancelled':
      return 'destructive';
    default:
      return 'default';
  }
};

const OrdersPage = () => {
  console.log('OrdersPage loaded');

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    let result = orders;

    // Filter by status
    if (statusFilter !== 'All') {
      result = result.filter(order => order.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(result);
  }, [orders, searchTerm, statusFilter]);

  const handleUpdateStatus = (newStatus: OrderStatus) => {
    if (selectedOrder) {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === selectedOrder.id ? { ...order, status: newStatus } : order
            )
        );
        setIsDialogOpen(false);
        setSelectedOrder(null);
    }
  };

  const handleEditClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full">
        <Header />
        <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Orders</h1>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search by ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked={statusFilter === 'All'} onCheckedChange={() => setStatusFilter('All')}>All</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={statusFilter === 'Processing'} onCheckedChange={() => setStatusFilter('Processing')}>Processing</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={statusFilter === 'Shipped'} onCheckedChange={() => setStatusFilter('Shipped')}>Shipped</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={statusFilter === 'Delivered'} onCheckedChange={() => setStatusFilter('Delivered')}>Delivered</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={statusFilter === 'Cancelled'} onCheckedChange={() => setStatusFilter('Cancelled')}>Cancelled</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="border rounded-lg shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditClick(order)}>
                            Edit Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="text-center text-muted-foreground py-10">
              <p>No orders found.</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
      
      {/* Edit Order Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Order {selectedOrder?.id}</DialogTitle>
              <DialogDescription>
                Update the status for this order. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p><strong>Customer:</strong> {selectedOrder?.customerName}</p>
              <p><strong>Total:</strong> ${selectedOrder?.total.toFixed(2)}</p>
              <div className="flex items-center gap-4 mt-4">
                <label>Status:</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{selectedOrder?.status || 'Select Status'}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => handleUpdateStatus('Processing')}>Processing</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleUpdateStatus('Shipped')}>Shipped</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleUpdateStatus('Delivered')}>Delivered</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleUpdateStatus('Cancelled')}>Cancelled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              {/* The save logic is tied to the dropdown selection for simplicity */}
            </DialogFooter>
          </DialogContent>
      </Dialog>

    </div>
  );
};

export default OrdersPage;