import mongoose, { Schema } from 'mongoose';

const timeCapsuleSchema = new Schema(
    {
        subject:{
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        fileUrl: [
            {
                type: String,
                required: true,
            },
        ],
        creationDate: {
            type: String,
            required: true,
        },
        deliveryDate: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: 'UserModel',
            required: true,
        },
        emailSent: { // New field
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const TimeCapsule = mongoose.models.TimeCapsule || mongoose.model('TimeCapsule', timeCapsuleSchema);

export default TimeCapsule;
