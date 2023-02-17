import Question from "../../models/question.js";
import Option from "../../models/option.js";

// Get question by ID
export async function getQuestion(req, res) {
  try {
    const questionID = req.params.id;
    const question = await Question.findById(questionID);

    if (!question) {
      return res.status(404).json({
        messsage: "Question not found",
      });
    }

    await question.populate("options");
    console.log(question);
    res.status(200).json({
      question,
      message: "Successfull",
    });
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

// Create question
export async function create(req, res) {
  const title = req.body.title;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  try {
    const question = await Question.create({
      title,
    });
    res.status(200).json({
      question,
      message: "Question created successfully",
    });
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

// Create option for question
export async function createOption(req, res) {
  const questionID = req.params.id;
  const optionText = req.body.text;
  if (!optionText) {
    // returning if required details are not provided
    return res.status(400).json({
      message: "Required option text",
    });
  }

  try {
    const question = await Question.findById(questionID);

    if (!question) {
      return res.status(404).json({
        messsage: "Question not found",
      });
    }

    await question.addOption(optionText);

    await question.populate("options");

    res.status(200).json({
      question,
      message: "Added option successfully",
    });
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

// Delete question
export async function deleteQuestion(req, res) {
  try {
    const questionID = req.params.id;

    const question = await Question.findById(questionID);
    if (!question) {
      return res.status(404).json({
        messsage: "Question not found",
      });
    }

    // Populating all options for question to get votes details.
    await question.populate("options");
    let questionCanBeDeleted = true;
    for (let option of question.options) {
      if (option.votes > 0) {
        // not deleting if option has votes > 0
        questionCanBeDeleted = false;
        break;
      }
    }

    if (questionCanBeDeleted) {
      // Deleting question and its repective options
      await Option.deleteMany({ question: question.id });
      await Question.deleteOne({ id: question.id });
      res.status(200).json({
        question,
        message: "Question and its respective options deleted",
      });
    } else {
      res.status(200).json({
        question,
        message: "Question cannot be deleted, one of its options has votes",
      });
    }
  } catch (error) {
    console.log("Error : ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
