const express = require("express");
const router = new express.Router();
const moment = require("moment");
const multer = require("multer");
const users = require("../models/userSchema.js");
const lostItems = require("../models/lostSchema.js");
const foundItems = require("../models/foundSchema.js");
const cloudinary = require("../helper/cloudinaryConfig.js");
const controllers = require("../controllers/userControllers.js");

// img storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allow"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

//router.post("/user/register", controllers.userregister);

router.get("/", controllers.api);

// user registration
router.post("/user/register", controllers.userregister);

// user login
router.post("/user/login", controllers.userLogin);

// get one user data
router.post("/user/data", controllers.userData);

// get all user data
router.post("/user/allusersdata", controllers.allUserData);

// block a user
router.post("/user/toggleblockuser", controllers.toggleBlockUser);

// editing profile pic
router.post("/user/editprofile", upload.single("photo"), async (req, res) => {
  const upload = await cloudinary.uploader.upload(req.file.path);

  //console.log(upload);
  const { userId } = req.body;
   console.log(userId);

  try {
    const findUser = await users.findById(userId);
    if (!findUser) {
      return res.status(400).json({ message: "User dont exist" });
    }

    await lostItems.updateMany(
      { userId: userId },
      { $set: { userProfileImgPath: upload.secure_url } }
    );

    await foundItems.updateMany(
      { userId: userId },
      { $set: { userProfileImgPath: upload.secure_url } }
    );

    findUser.profileImgPath = upload.secure_url;

    await findUser.save();
    res.status(200).json(findUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

// remove profile pic
router.post("/user/removeprofilepic", controllers.removeProfilePic);

// editing user credentials
router.post("/user/updatecred", controllers.userCredUpdate);

// creating lost post
router.post("/user/lostitem", upload.single("photo"), async (req, res) => {
  const upload = await cloudinary.uploader.upload(req.file.path);

  const { userId, title, description } = req.body;

  try {
    const findUser = await users.findById(userId);
    if (!findUser) {
      return res.status(400).json({ message: "User dont exist" });
    }

    const date = moment(new Date()).format("YYYY-MM-DD");

    const lostItemData = new lostItems({
      date: date,
      itemImgPath: upload.secure_url,
      title: title,
      description: description,
      userId: userId,
      userName: findUser.fname,
      userEmail: findUser.email,
      userProfileImgPath: findUser.profileImgPath,
    });

    await lostItemData.save();
    res
      .status(200)
      .json({ message: "Post Created Successfully", lostItemData });
  } catch (error) {
    res.status(400).json(error);
  }
});

// creating found post
router.post("/user/founditem", upload.single("photo"), async (req, res) => {
  const upload = await cloudinary.uploader.upload(req.file.path);

  const { userId, title, description } = req.body;

  try {
    const findUser = await users.findById(userId);
    if (!findUser) {
      return res.status(400).json({ message: "User dont exist" });
    }

    const date = moment(new Date()).format("YYYY-MM-DD");

    const foundItemData = new foundItems({
      date: date,
      itemImgPath: upload.secure_url,
      title: title,
      description: description,
      userId: userId,
      userName: findUser.fname,
      userEmail: findUser.email,
      userProfileImgPath: findUser.profileImgPath,
    });

    await foundItemData.save();
    res
      .status(200)
      .json({ message: "Post Created Successfully", foundItemData });
  } catch (error) {
    res.status(400).json(error);
  }
});

// get all lost item's data for a user
router.post("/user/getalllostitems", controllers.getAllLostItemsData);

// get all lost items posted by users
router.post("/user/getalllostitemsposted", controllers.getAllLostItemsPosted);

// get all found item's data for a user
router.post("/user/getallfounditems", controllers.getAllFoundItemsData);

// get all found items posted by users
router.post("/user/getallfounditemsposted", controllers.getAllFoundItemsPosted);

// deleting one lost post
router.delete("/user/deletelostitem", controllers.deleteLostItem);

// deleting one found post
router.delete("/user/deletefounditem", controllers.deleteFoundItem);

module.exports = router;
