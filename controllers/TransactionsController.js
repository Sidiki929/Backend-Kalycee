const Transactions = require("../models/Transactions")
const asyncHandler = require('express-async-handler');

const createTransactions = asyncHandler(async (req, res) => {
  try {
    const { id_client, amount, transfertType, transfertState } = req.body;

    // Vérifier que tous les champs requis sont présents
    if (!id_client || !amount || !transfertState ) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
    const todayDate = new Date();
    const newReleve = new Transactions({
      id_client,
      amount,
      transfertType,
      transfertState,
      date_transaction: todayDate
    });
    await newReleve.save();
    res.status(201).json(newReleve);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

  const getAllTransactions =  asyncHandler(async (req, res) => {
    try {
        const getTransactions = await Transactions.find().sort({ date_transaction: -1 });
        res.json(getTransactions);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteTransactions = asyncHandler(async (req, res) => {
    const { id } = req.params;
   // validateMongoDbId(id);   
    try {
        const deleteUnites = await Transactions.findByIdAndDelete(id);
        res.json({deleteUnites});
     } catch (error) {
         throw new Error(error)
     }
});
const updateTransactions = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const findUnites = await Transactions.findById(id);
        if (!findUnites) {
            throw new Error('Releve non trouvée');
        }

        const editedUnites = await Transactions.findByIdAndUpdate(id, req.body, { new: true });
        res.json(editedUnites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de l'unites" });
    }
});



module.exports = { createTransactions , getAllTransactions, deleteTransactions,updateTransactions }
