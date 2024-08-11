const { errorHandler } = require("../error/errors");
const { Banner } = require("../models");

module.exports = {
  test: async (req, res) => {
    return res.json({
      success: true,
      message: "Its working fine",
    });
  },

  CreateOrUpdateBanner: async (req, res) => {
    const { heading, content, timer, link, active } = req.body;

    // Validate required fields
    if (!content || !timer || !link)
      return errorHandler(res, 400, "Content, timer, and link is required.");

    try {
      // Fetch the existing banner (assuming there's only one)
      let banner = await Banner.findOne();

      if (banner) {
        // Update the existing banner
        banner.heading = heading || banner.heading;
        banner.content = content;
        banner.timer = timer;
        banner.link = link;
        banner.active = typeof active === "boolean" ? active : banner.active;

        await banner.save();

        res.status(200).json({
          success: true,
          message: "Banner updated",
          banner,
        });
      } else {
        // Create a new banner
        banner = await Banner.create({
          heading,
          content,
          timer,
          link,
          active: typeof active === "boolean" ? active : true,
        });

        res.status(201).json({
          success: true,
          message: "Banner created",
          banner,
        });
      }
    } catch (error) {
      console.error("Error in CreateOrUpdateBanner:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create or update banner",
        error: error.message,
      });
    }
  },

  fetchBanner: async (req, res) => {
    try {
      const banner = await Banner.findOne();

      if (!banner) {
        return res.status(404).json({
          success: false,
          message: "Banner not found",
        });
      }

      return res.status(200).json({
        success: true,
        banner,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },

  toggleBanner: async (req, res) => {
    try {
      const banner = await Banner.findOne();

      if (!banner) {
        return res.status(404).json({
          success: false,
          message: "Banner not found",
        });
      }

      // Toggle the active status
      banner.active = !banner.active;

      await banner.save();

      return res.status(200).json({
        success: true,
        message: `Banner is now ${banner.active ? "active" : "inactive"}.`,
        banner,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },
};
