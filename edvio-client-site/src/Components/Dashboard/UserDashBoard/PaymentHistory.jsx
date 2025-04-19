import React, { useState } from 'react';

const PaymentHistory = () => {
  // Sample data (You can replace this with real data from an API)
  const paymentData = [
    { id: '123', date: '2025-04-01', amount: 100, method: 'Credit Card', status: 'Completed' },
    { id: '124', date: '2025-04-02', amount: 50, method: 'PayPal', status: 'Pending' },
    { id: '125', date: '2025-04-03', amount: 200, method: 'Debit Card', status: 'Completed' },
    { id: '126', date: '2025-04-04', amount: 120, method: 'Bank Transfer', status: 'Failed' },
    // Add more sample data
  ];

  const [filter, setFilter] = useState('All'); // Filter by status
  const [search, setSearch] = useState(''); // Search by payment ID

  // Filter and search logic
  const filteredPayments = paymentData.filter(payment => {
    const matchesFilter = filter === 'All' || payment.status === filter;
    const matchesSearch = payment.id.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 bg-darkTeal min-h-screen">
      <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Payment History</h2>

      {/* Filter and Search Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded-lg border border-teal-300 text-teal-600"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by Payment ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded-lg border border-teal-300 text-teal-600"
          />
        </div>
      </div>

      {/* Payment History Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto">
          <thead className="bg-teal-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Payment ID</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Payment Method</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b">
                  <td className="py-2 px-4 text-teal-800">{payment.id}</td>
                  <td className="py-2 px-4 text-teal-800">{payment.date}</td>
                  <td className="py-2 px-4 text-teal-800">${payment.amount}</td>
                  <td className="py-2 px-4 text-teal-800">{payment.method}</td>
                  <td className={`py-2 px-4 ${payment.status === 'Completed' ? 'text-green-600' : payment.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {payment.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-2 px-4 text-center text-gray-600">No payments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
