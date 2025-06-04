import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  membershipDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  statics: {
    async activeCount() {
      return this.countDocuments({ isActive: true });
    }
  },
  query: {
    byEmail(email) {
      return this.where({ email: new RegExp(email, 'i') });
    }
  }
});

UserSchema.index({ email: 1 });
UserSchema.index({ fullName: 1 });

UserSchema.virtual('summary')
  .get(function () {
    return `${this.fullName} (${this.email})`;
  });

const User = mongoose.model("User", UserSchema);

export default User;
