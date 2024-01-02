import slugify from "slugify";
import bannerModel from "../models/bannerModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";

export const createBannerController = async (req, res) => {
  try {
    const { name, slug, photo, category } = req.fields;

    const BannerData = {
      name,
      slug,
      photo,
      category,
    };

    const newBanner = new bannerModel(BannerData);
    await newBanner.save();
    res.status(201).json({ message: "Banner Create Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the Banner" });
  }

  // try {
  //     const {name,slug,category,} = req.fields;
  //     const {photo} = req.files;
  //     //validation
  //     switch(true){
  //         case !name:
  //             return res.status(500).send({error:'Name required'})
  //             case !category:
  //             return res.status(500).send({error:'Category required'})
  //             case photo && photo.size > 5000000:
  //                 return res
  //                   .status(500)
  //                   .send({ error: "photo is Required and should be less then 1mb" });
  //     }
  //     const products = new bannerModel({...req.fields, slug:slugify(name)})
  //     if(photo){
  //         products.photo.data = fs.readFileSync(photo.path)
  //         products.photo.contentType = photo.type
  //     }
  //     await products.save();
  //     res.status(201).send({
  //         success:true,
  //         message:'Product Created Successfully',
  //         products,
  //     });
  // } catch (error) {
  //     console.log(error)
  //     res.send(500).send({
  //         success:false,
  //         message:'Error in Create Product',
  //         error,
  //     })
  // }
};

//getBannerController

// export const getBannerController = async (req, res) => {
//   try {
//     const products = await bannerModel
//       .find({})
//       .populate("category")
//       .limit(20)
//       .sort({ createdAt: -1 });
//     res.status(200).send({
//       success: true,
//       countTotal: products.length,
//       message: "All Products",

//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in get products",
//       error,
//     });
//   }
// };

export const getBannerController = async (req, res) => {
  try {
    const products = await bannerModel.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(501).json({ message: "banner not found" });
  }
};

//getSingleBannerController

export const getSingleBannerController = async (req, res) => {
  try {
    const product = await bannerModel.findOne({ name: req.params.name });
    res.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get single products",
      error,
    });
  }
};

//deleteProductController

export const deleteBannerController = async (req, res) => {
  try {
    await bannerModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Successfully Product Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//updateProductController

export const updateBannerController = async (req, res) => {
  try {
    const { name, photo } = req.fields;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name required" });

      case !photo:
        return res.status(500).send({ error: "photo required" });
    }

    const products = await bannerModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields},
      { new: true }
    );

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      message: "Error in Update Product",
      error,
    });
  }
};
