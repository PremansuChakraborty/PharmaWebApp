import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    medicines: [
      {
        medicine_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'medicineModel',
          required: true
        },
        count: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userModel',
      required: true
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'addressModel',
      required: true
    },
    payment: {
      mode: {
        type: String,
        enum: ['CASH ON DELIVERY', 'Online Methods'],
        required: true
      },
      amount: {
        type: Number,
        required: true,
        min: 0
      },
      status: {
        type: String,
        enum: ['PENDING', 'PAID', 'FAILED'],
        default: 'PENDING'
      }
    },
    status: {
      type: String,
      enum: ['PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
      default: 'PLACED'
    }
  }, { timestamps: true });
  

const orderModel=mongoose.model('orderModel',orderSchema);
export default orderModel;