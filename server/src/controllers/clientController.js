const Client = require("../models/Client");

const getClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    res.json(clients);
  } catch (err) {
    res.status(400).send("Error in fetching clients");
  }
};

const addClient = async (req, res) => {
  try {
    const { name, description, designation, imageUrl } = req.body;
    const newClient = new Client({ name, description, designation, imageUrl });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).send("Error in adding client");
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Client.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully", deletedClient: deleted });
  } catch (err) {
    res.status(500).json({ message: "Error deleting client" });
  }
};

module.exports = { getClients, addClient, deleteClient };
