import Comment from "../models/Comment.js";
import Business from "../models/Business.js";

export const addComment = async (req, res) => {
  const { comment, rate, userId, businessId } = req.body;

  try {
    const newComment = await Comment.create({
      comment,
      rate,
      userId,
      businessId,
    });

    const business = await Business.findById(businessId);

    business.comments.push(newComment._id);

    const result = await Comment.aggregate([
      {
        $match: {
          businessId: business._id,
        },
      },
      {
        $group: {
          _id: null,
          averageRate: {
            $avg: "$rate",
          },
        },
      },
    ]);

    business.rate = result[0]?.averageRate || 0;

    await business.save();

    res.status(201).json({
      message: "نظر با موفقیت ثبت شد",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "خطا در ثبت نظر",
    });
  }
};
