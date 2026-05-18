import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userName: { 
    type: String, 
    required: true 
  },
  productName: { 
    type: String, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true,
    default: 1 
  },
  totalAmount: { 
    type: Number, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// We create the model using the schema above
const Order = mongoose.model('Order', orderSchema);

export default Order;