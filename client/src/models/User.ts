import  mongoose, { Schema, model } from  "mongoose";

export interface UserDocument {
    _id: string;
    email: string;
    password: string;
    username: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    score: number;
  }

  const UserSchema = new Schema<UserDocument>({
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: [true, "Name is required"]
    },
    score: {
      type: Number,
      default: 100
    },
    image: {
      type: String,
      default: 'https://cdn2.thecatapi.com/images/9at.jpg'
    }
  },
  {
    timestamps: true,
  }
);

const  User  =  mongoose.models?.User  ||  model<UserDocument>('User', UserSchema);
export  default  User;