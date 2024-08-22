import React, { useState } from 'react'; // Import React and useState
import axios from 'axios'; // Import axios for HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const Payment = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Optional: To handle the loading state
    const navigate = useNavigate(); // Use useNavigate for programmatic navigation

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true); // Set loading state to true

        try {
            console.log("Starting the POST request");

            // Simulate an API request using axios
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { 
                name,
                amount,
                number
             });

            console.log("Response data is: ", response.data);

            // Redirect to the success page with state containing form data
            navigate('/success', { state: { name } });
        } catch (error) {
            console.error('Payment failed:', error.response ? error.response.data : error.message);
            alert('Payment failed. Please try again.');
        } finally {
            setIsSubmitting(false); // Reset loading state
        }
    };

    return (
        <div className="container mt-4">
            <h2>Payment</h2>
            <form className="mb-3" onSubmit={handleSubmit}>
                <label htmlFor="nameInput" className="form-label">Name</label>
                <input 
                    type='text'
                    id="nameInput"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                 <label htmlFor="nameInput" className="form-label">Amount</label>
                <input 
                    type='number'
                    id="nameInput"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                 <label htmlFor="nameInput" className="form-label">Number</label>
                <input 
                    type='number'
                    id="nameInput"
                    className="form-control"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />
                <button 
                    className="btn btn-primary mt-3" 
                    type="submit" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
};

export default Payment;
