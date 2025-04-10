const express = require('express');
const router = express.Router();
const campaignController = requiere('../controllers/campaignController');

router.get("/", campaignController.getAllCampaigns);
router.get("/:id", campaignController.getCampaign);
router.post("/", campaignController.createCampaign);
router.put("/:id", campaignController.updateCampaign);
router.delete("/:id", campaignController.deleteCampaign);

module.exports = router;