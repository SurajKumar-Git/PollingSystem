import { Schema, model } from "mongoose";
import Option from "./option.js";

const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
  },
  {
    methods: {
      async addOption(optionText) {
        // Method to create new option and push it in question options array
        const newOption = await Option.create({
          text: optionText,
          question: this,
        });

        this.options.push(newOption.id);
        await this.save();
      },
    },
    toJSON: {
      // Transforming Document to required JSON fields
      versionKey: false,
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

export default model("Question", questionSchema);
