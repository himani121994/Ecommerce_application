import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from "axios";
const Paypage=()=>{

  const [input, setInput]=useState({})
  const cartData=useSelector((state)=>state.cartProduct.cart);
    let totalAmount=0;
    let productDetails="";
    const myData=cartData.map((key)=>{
      totalAmount+=key.price*key.qnty;
      productDetails+=key.name+" qty -"+key.qnty+" rate-  "+ key.price;
    });
     
    const handleInput=(e)=>{
      let name=e.target.name;
      let value=e.target.value; 
      setInput(values=>({...values, [name]:value}));
    }



    const [myproduct,setMyProduct] = useState({
          price: totalAmount ,
          name:productDetails,
          img:"t1.jpg"

  });
  
  const initPay = (data) => {
    const options = {
      key : "rzp_test_wSRMq5JPvS83sE",
      amount: data.amount,
      currency: data.currency,
      name: myproduct.name,
      description: "my good t shirt",
      image:myproduct.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = "https://localhost:8000/api/payment/verify";
          const {data} = await axios.post(verifyURL,response);
        } catch(error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = window.Razorpay ? new window.Razorpay(options) : null;
    if (rzp1) {
        rzp1.open();
    } else {
        console.error("Razorpay SDK not available");
    }
  };
  
  const handlePay = async () => {
    try {
      const orderURL = "http://localhost:8000/api/payment/orders";
      const {data} = await axios.post(orderURL,{amount: myproduct.price, productitems:myproduct.name,  ...input});
      console.log(data);
      initPay(data.data);
    } catch (error) {
      console.log(error);
    }
  };
    





    return(
        <>
          <center>
          <h1> Payment</h1>
          <h2> Enter Your Shipping Address</h2>
          <div style={{display:"flex", justifyContent:"center"}}>
            <div>
          <table>
            <tr>
                <td> Enter Name : </td>
                <td> </td>
                <td> <input type="text" name="name" value={input.name} onChange={handleInput} /> </td>
            </tr>
            <tr>
                <td> Enter Address : </td>
                <td> </td>
                <td> <input type="text" name="address" value={input.address} onChange={handleInput} /> </td>
            </tr>
            <tr>
                <td> Enter Mobile No : </td>
                <td> </td>
                <td> <input type="text" name="mobile" value={input.mobile} onChange={handleInput} /> </td>
            </tr>
            <tr>
                <td> Enter Pin code : </td>
                <td> </td>
                <td> <input type="text" name="pincode" value={input.pincode} onChange={handleInput} /> </td>
            </tr>
          </table>
          </div>
            <div>

                <table>
                    <tr>
                        <td> <h1> Net Payble Amount: </h1> </td>
                        <td> 
                          <h1> {totalAmount} </h1>   
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={handlePay}> Pay Now!</button>
                            
                             </td>
                        <td> 
                          <h1>  </h1>   
                        </td>
                    </tr>
                </table>

            </div>
          </div>
          </center>
        </>
    )
}
export default Paypage;