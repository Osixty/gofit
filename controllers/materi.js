const db = require("../models");
const Materi = db.materi;

//CREATE: untuk menambahkan data ke dalam tabel Materi
exports.create = async (req, res) => {
    try {
        const data = await Materi.create(req.body)
        res.json({
            message: "Asik, data berhasil ditambahkan",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
}

//READ: menampilkan atau mengambil semua data Materi sesuai model dari database
exports.getAll = async (req, res) => {
    try {
        const materi = await Materi.findAll()
        res.json({
            message: "Materi retrieved successfully.",
            data: materi,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        })
    }
};

// Mengubah data sesuai id yang dikirimkan
exports.update = async (req, res) => {
    const id = req.params.id
    try {
        const materi = await Materi.findByPk(id, { rejectOnEmpty: true })
        materi.update(req.body, {
            where: { id }
        })
        res.json({
            message: "Materi updated successfully.",
            data: materi,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving Materi",
            data: null,
        });
    }
}

// Menghapus data sesuai id yang dikirimkan
exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const materi = await Materi.findByPk(id, { rejectOnEmpty: true })

        materi.destroy()

        res.json({
            message: "Materi deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving Materi",
            data: null,
        });
    }
}

// Mengambil data sesuai id yang dikirmkan
exports.findOne = async (req, res) => {
    const id = req.params.id
    try {
        const materi = await Materi.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: `Materi retrieved successfully with id=${id}.`,
            data: materi,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving Materi",
            data: null,
        });
    }
};

// Menampilkan atau mengambil semua data Materi berdasarkan level tertentu
exports.getKategori = async (req, res) => {
    const id = req.params.id
    const materi = await Materi.findAll({
        where: {
            kategori: id
        }
    })
    res.json({
        message: `Materi retrieved successfully with levelId=${id}.`,
        data: materi,
    });
}