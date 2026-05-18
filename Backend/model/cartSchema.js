import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'] 
  },
  price: { 
    type: Number, 
    required: [true, 'Product price is required'] 
  },
  quantity: { 
    type: Number, 
    default: 1, 
    min: 1 
  },
  category: { 
    type: String, 
    default: 'Smartphones' 
  },
  image: { 
    type: String, 
    required: false 
  }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;