const Campaign = require('../models/Campaign');

exports.getAllCampaigns = async (req, res) => {
    try {
      const campaigns = await Campaign.find({ userId: req.userId });
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener campañas", error });
    }
};

exports.getCampaign = async (req, res) => {
    try {
      const campaign = await Campaign.findById(req.params.id);
      if(!campaign)
        return res.status(404).json({ message: "Campaña no encontrada" });
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la campaña", error });
    }
};

exports.createCampaign = async (req, res) => {
    try {
      const newCampaign = new Campaign({ ...req.body, userId: req.userId });
      await newCampaign.save();
      res.status(201).json(newCampaign);
    } catch (error) {
      res.status(500).json({ message: "Error al crear la campaña", error });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
      const updatedCampaign = await Campaign.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedCampaign)
        return res.status(404).json({ message: "Campaña no encontrada" });
      res.json(updatedCampaign);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la campaña", error });
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
      const deletedCampaign = await Campaign.findByIdAndDelete(req.params.id);
      if (!deletedCampaign)
        return res.status(404).json({ message: "Campaña no encontrada" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la campaña", error });
    }
};