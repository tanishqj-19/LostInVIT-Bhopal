const jwt = require("jsonwebtoken");
const SECRECT_KEY = "abcdefghijklmnop";
const bcrypt = require("bcryptjs");
const users = require("../models/userSchema.js");
const lostItems = require("../models/lostSchema.js");
const foundItems = require("../models/foundSchema.js");

exports.api = async (req, res) => {
  res.status(200).json({ message: "Server is working" });
};

// user registration
exports.userregister = async (req, res) => {
  const {
    fname,
    lname,
    regNo,
    email,
    hostelOrDayScholar,
    password,
    isAdmin,
    isBlocked,
  } = req.body;

  if (!fname || !email || !password || !regNo || !hostelOrDayScholar) {
    res.status(400).json({ error: "Please Enter All Input Data" });
  }

  try {
    // console.log(fname);
    // console.log(lname)
    // console.log(email);
    // console.log(regNo);
    // console.log(hostelOrDayScholar);
    // console.log(password);
    

    
    const preUser = await users.findOne({ regNo: regNo});
   
    if (preUser) {
      
      res.status(400).json({ error: "This User Already Exist" });
    } else {
      
      const userregister1 = new users({
        fname,
        lname,
        regNo,
        email,
        hostelOrDayScholar,
        password,
        isAdmin: isAdmin || false,
        isBlocked: isBlocked || false,
      });
      

      // here password hasing
      const storeData = await userregister1.save();
    
      res.status(200).json(storeData);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

// user login
exports.userLogin = async (req, res) => {
  const { regNo, password } = req.body;

  if (!regNo || !password) {
    res.status(400).json({ error: "Please enter all input fields" });
  }

  try {
    const findUser = await users.findOne({ regNo: regNo });

    if (findUser) {
      const passwordCheck = await bcrypt.compare(password, findUser.password);

      if (passwordCheck) {
        if (findUser.isBlocked) {
          res.status(200).json({ message: "Blocked" });
        } else {
          const token = await findUser.generateAuthtoken();
          res.status(200).json({
            message: "User Login Successfully Done",
            userToken: token,
          });
        }
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      res.status(400).json({ message: "Please register first" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(400)
      .json({ error: "Invalid Details", specificError: error.message });
  }
};

// get one user data
exports.userData = async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, SECRECT_KEY);
    const userID = user._id;
    const userData = await users.findOne({ _id: userID });

    res.status(200).json({ data: userData });
  } catch (error) {
    res.status(400).json({ error: "Some Error Occured", error });
  }
};

// geting all user's data
exports.allUserData = async (req, res) => {
  const search = req.body.search || "";
  if (search.length === 0) {
    try {
      const usersData = await users.find({});

      return res.status(200).json(usersData);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Some error occurred", error: error.message });
    }
  } else {
    const query = {
      fname: { $regex: search, $options: "i" },
    };
    try {
      const usersData = await users.find(query);
      res.status(201).json(usersData);
    } catch (error) {
      res.status(400).json({ error: "Some Error Occured", error });
    }
  }
};

// block or unblock a user
exports.toggleBlockUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const findUser = await users.findById(userId);
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (findUser.isBlocked === true) {
      findUser.isBlocked = false;
      await findUser.save();
      return res
        .status(200)
        .json({ message: "Unblocked Successful", user: findUser });
    } else {
      findUser.isBlocked = true;
      await findUser.save();
      return res
        .status(200)
        .json({ message: "Blocked Successful", user: findUser });
    }
  } catch (error) {
    res.status(400).json({ error: "Some Error Occured", error });
  }
};

// remove profile pic
exports.removeProfilePic = async (req, res) => {
  const { userId } = req.body;

  try {
    const findUser = await users.findById(userId);
    if (!findUser) {
      return res.status(400).json({ message: "User dont exist" });
    }

    await lostItems.updateMany(
      { userId: userId },
      { $set: { userProfileImgPath: null } }
    );

    await foundItems.updateMany(
      { userId: userId },
      { $set: { userProfileImgPath: null } }
    );

    findUser.profileImgPath = null;

    await findUser.save();
    res.status(200).json(findUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

// update user credentials
exports.userCredUpdate = async (req, res) => {
  const { userId, newpassword, newhostelOrDayScholar } = req.body;

  try {
    const findUser = await users.findById(userId);
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newpassword) {
      findUser.password = newpassword;
    }
    if (newhostelOrDayScholar) {
      findUser.hostelOrDayScholar = newhostelOrDayScholar;
    }

    await findUser.save();
    return res
      .status(200)
      .json({ message: "Update Successful", user: findUser });
    // Change 'user' to 'findUser' in the above line
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Some Error Occurred", error: error.message });
  }
};

// getting all lost item's data for a user
exports.getAllLostItemsData = async (req, res) => {
  const { userId } = req.body;

  try {
    const findUser = await users.findById(userId);

    if (!findUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    // If user exists, find all posts created by the user
    const userPosts = await lostItems.find({ userId: userId });

    // Return the array of user's posts
    return res.status(200).json({ userPosts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Some error occurred", error: error.message });
  }
};

// getting all lost items posted by users
exports.getAllLostItemsPosted = async (req, res) => {
  const search = req.body.search || "";

  if (search.length === 0) {
    try {
      const allLostItems = await lostItems.find({});

      return res.status(200).json(allLostItems);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Some error occurred", error: error.message });
    }
  } else {
    const query = {
      title: { $regex: search, $options: "i" },
    };
    try {
      const allLostItems = await lostItems.find(query);
      res.status(201).json(allLostItems);
    } catch (error) {
      res.status(400).json({ error: "Some Error Occured", error });
    }
  }
};

// getting all found item's data for a user
exports.getAllFoundItemsData = async (req, res) => {
  const { userId } = req.body;

  try {
    const findUser = await users.findById(userId);

    if (!findUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    // If user exists, find all posts created by the user
    const userPosts = await foundItems.find({ userId: userId });

    // Return the array of user's posts
    return res.status(200).json({ userPosts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Some error occurred", error: error.message });
  }
};

// getting all found items posted by users
exports.getAllFoundItemsPosted = async (req, res) => {
  const search = req.body.search || "";

  if (search.length === 0) {
    try {
      const allFoundItems = await foundItems.find({});

      return res.status(200).json(allFoundItems);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Some error occurred", error: error.message });
    }
  } else {
    const query = {
      title: { $regex: search, $options: "i" },
    };
    try {
      const allFoundItems = await foundItems.find(query);
      res.status(201).json(allFoundItems);
    } catch (error) {
      res.status(400).json({ error: "Some Error Occured", error });
    }
  }
};

// deleting one lost post
exports.deleteLostItem = async (req, res) => {
  try {
    const { postId } = req.body;

    // Use findOneAndDelete to find the document by postId and delete it
    const deletedPost = await lostItems.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// deleting one found post
exports.deleteFoundItem = async (req, res) => {
  try {
    const { postId } = req.body;

    // Use findOneAndDelete to find the document by postId and delete it
    const deletedPost = await foundItems.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
