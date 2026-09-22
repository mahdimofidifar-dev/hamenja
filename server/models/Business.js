import mongoose from "mongoose";

const workingRangeSchema = new mongoose.Schema(
  {
    open: {
      type: String,
      required: true,
    },

    close: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const businessModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    mobile: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    socialLinks: [
      {
        type: {
          type: String,
          required: true,
        },

        value: {
          type: String,
          required: true,
        },
      },
    ],

    province: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    neighborhood: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    amenities: {
      type: [String],
      default: [],
    },

    is24Hours: {
      type: Boolean,
      default: false,
    },

    workingHours: {
      type: Map,
      of: [workingRangeSchema],
      default: {},
    },

    logo: {
      type: String,
      required: false,
    },

    gallery: {
      type: [String],
      default: [],
    },

    uniqName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    rate: {
      type: Number,
      default: 0,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],

    category: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Business = mongoose.model("business", businessModel);

export default Business;
