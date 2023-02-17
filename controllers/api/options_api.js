import Option from "../../models/option.js";
import Question from "../../models/question.js";

// add vote to option action
export async function addVote(req, res) {
  try {
    const optionID = req.params.id;
    const option = await Option.findById(optionID);
    if (!option) {
      // returning if option not found
      return res.status(404).json({
        message: "Option not found",
      });
    }

    await option.addVote();
    res.status(200).json({
      option,
      message: "Added vote",
    });
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

// Delete option action
export async function deleteOption(req, res) {
  try {
    const optionID = req.params.id;
    const option = await Option.findById(optionID);
    if (!option) {
      // returning if option not found
      return res.status(404).json({
        message: "Option not found",
      });
    }

    if (option.votes > 0) {
      // Not deleting option if has votes > 0
      res.status(200).json({
        option,
        message: "Option cannot be deleted, Has votes added to it.",
      });
    } else {
      /* Delete option if has 0 votes
        Get question, to remove option from question's option array;
        and Delete option from DB
      */
      const question = await Question.findById(option.question);
      question.options = question.options.filter(
        (optionID) => optionID.toString() != option.id
      );
      await question.save();
      await Option.deleteOne({ _id: option.id });
      res.status(200).json({
        option,
        message: "Option deleted successfully",
      });
    }
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
