import { Schema, model } from "mongoose";

const optionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    votes: {
      type: Number,
      required: true,
      default: 0,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  },
  {
    methods: {
      async addVote() {
        this.votes++;
        await this.save();
      },
    },
    virtuals: {
      // Getting link to vote dynamically without storing it in DB using virtuals.
      link_to_vote: {
        get() {
          return `/options/${this.id}/add_vote`;
        },
      },
    },
    toObject: { virtuals: true },
    toJSON: {
      // Transforming Document to required JSON fields
      // i.e including link_to_vote virtual in JSON data, removing certain fields.
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.question;
        return ret;
      },
    },
  }
);

export default model("Option", optionSchema);
