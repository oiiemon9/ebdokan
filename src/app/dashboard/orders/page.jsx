'use client';

import DashboardHeader from '@/Components/Dashboard/DashboardHeader';

export default function OrdersPage() {
  const orders = [
    {
      id: 1001,
      customer: 'John Doe',
      total: '$149.99',
      status: 'Completed',
      date: '2024-05-01',
    },
    {
      id: 1002,
      customer: 'Jane Smith',
      total: '$89.99',
      status: 'Pending',
      date: '2024-05-02',
    },
    {
      id: 1003,
      customer: 'Bob Johnson',
      total: '$199.99',
      status: 'Shipped',
      date: '2024-05-03',
    },
  ];

  return (
    <div>
      <DashboardHeader
        title="Orders"
        description="View and manage all customer orders"
      />

      <div className="card bg-base-100 shadow-md border border-base-300">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-semibold">#{order.id}</td>
                    <td>{order.customer}</td>
                    <td className="font-semibold">{order.total}</td>
                    <td>
                      <span
                        className={`badge ${
                          order.status === 'Completed'
                            ? 'badge-success'
                            : order.status === 'Pending'
                              ? 'badge-warning'
                              : 'badge-info'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <button className="btn btn-xs btn-ghost">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
