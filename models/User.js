const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Password hash middleware.
// hshing the password before save
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['artist', 'curator', 'visitor'],
    default: 'visitor'
  },
}, { timestamps: true });


// ──────────────────────────────────────────────
UserSchema.pre('save', async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // strength of encryption
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


// Helper method for validating user's password.

/* UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, cb);
}; */

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
