import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './DashAssets/css/orderdetails.css';

const OrderDetail = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [ordersPerPage] = useState(8);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/payment/details');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const displayOrders = orders
    .slice(currentPage * ordersPerPage, (currentPage + 1) * ordersPerPage)
    .map((order, index) => (
      <tr key={order._id}>
        <td className='index-number'>{currentPage * ordersPerPage + index + 1}</td> {/* Serial Number */}
        <td>{order.name}</td>
        <td>{order.address}</td>
        <td>{order.mobile}</td>
        <td>{order.pincode}</td>
        <td>{order.productitems}</td>
        <td>{order.totalproductprice}</td>
      </tr>
    ));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="order-main-div">
      <h1>Order Details</h1>
      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Address</th>
            <th>Mobile No</th>
            <th>Pin code</th>
            <th>Product Details</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>{displayOrders}</tbody>
      </table>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(orders.length / ordersPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default OrderDetail;
