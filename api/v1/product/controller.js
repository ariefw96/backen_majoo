const productModel = require('../../model/product_model');
const categoryModel = require('../../model/category_model');
const formidable = require('formidable');
const fs = require('fs');
const pathlib = require('path');
const directory = "./public/images";
const moment = require('moment');
const { Op } = require('sequelize')

exports.add_product = async function (req, res) {
    const now = new Date();
    try {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                const { product_name, product_desc, product_price, product_category } = fields;
                const { path, size, name, type } = files.product_image;
            } catch (e) {
                return res.status(400).json({
                    status: 400,
                    message: 'Field tidak boleh kosong!!'
                })
            }
            const { product_name, product_desc, product_price, product_category } = fields;
            const { path, size, name, type } = files.product_image;
            const image_name = moment().unix();
            const extFile = pathlib.extname(name);
            const file_name = image_name + extFile;
            const fileUpload = pathlib.join(directory, file_name);
            fs.createReadStream(path)
                .pipe(fs.createWriteStream(fileUpload))
                .on('error', function () {
                    throw "failed to create file"
                })
                .on('finish', function () {
                    fs.unlink(path, (err => {
                        if (err) {
                            console.log(err);
                            throw "Failed to delete temp file"
                        }
                    }));
                });

            const isDuplicate = await productModel.findAll({
                where: {
                    product_name
                }
            })

            if (isDuplicate.length > 0) {
                return res.status(400).json({
                    status: 400,
                    message: 'Nama Produk tidak boleh sama'
                })
            }
            const dataProduct = {
                product_name,
                product_desc,
                product_price,
                product_category,
                product_image: `/images/${file_name}`,
                created_at: now,
                updated_at: now
            }
            await productModel.create(dataProduct);
            console.log("Sukses created product");
            res.status(200).json({
                status: 200,
                message: "Product created",
                data: dataProduct
            });
        })
    } catch (e) {
        res.status(500).json({
            status: 500,
            err: e
        });
    }
}

exports.all_product = async function (req, res) {
    let { page, size } = req.query;
    let start, end = 0;
    if (page == null) {
        page = 1;
    }

    if (size == null) {
        size = 5;
    }

    start = (page - 1) * size;
    end = page * size;

    console.log(start, end);

    try {
        let dataProduct = await productModel.findAll({ order: [['updated_at', 'DESC']] });

        let lastPage = (dataProduct.length % size) == 0 ? (dataProduct.length / size) : (Math.floor(dataProduct.length / size) + 1);
        dataProduct = dataProduct.slice(start, end);

        res.status(200).json({
            status: 200,
            message: "Produk berhasil ditampilkan",
            data: dataProduct,
            page: {
                prev: page == 1 ? null : parseInt(page) - 1,
                now: parseInt(page),
                next: page == lastPage ? null : parseInt(page) + 1,
                last: lastPage
            }
        });
    } catch (e) {
        res.status(500).json({
            err: e
        });
    }
}

exports.get_single_product = async function (req, res) {
    try {
        const { id } = req.query
        const dataProduct = await productModel.findOne({
            where: {
                id
            }
        });
        res.status(200).json({
            status: 200,
            message: dataProduct == null ? 'Produk tidak ditemukan' : 'Produk berhasil ditampilkan',
            data: dataProduct
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            err: e
        });
    }
}

exports.update_product = async function (req, res) {
    try {
        const { id } = req.query;
        const findData = await productModel.findOne({
            where: {
                id
            }
        });
        if (findData == null) {
            throw "Data tidak ditemukan";
        } else {
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                const { product_name, product_desc, product_price, product_category } = fields;
                const isDuplicate = await productModel.findAll({
                    where: {
                        id: {
                            [Op.not] :id
                        },
                        product_name
                    }
                })
                if (isDuplicate.length > 0) {
                    return res.status(400).json({
                        status: 400,
                        message: 'Duplikasi nama terdeteksi'
                    })
                }
                if (files?.product_image) {
                    const { path, size, name, type } = files.product_image;
                    const image_name = moment().unix();
                    const extFile = pathlib.extname(name);
                    const file_name = image_name + extFile;
                    const fileUpload = pathlib.join(directory, file_name);
                    fs.createReadStream(path)
                        .pipe(fs.createWriteStream(fileUpload))
                        .on('error', function () {
                            throw "Failed to create file"
                        })
                        .on('finish', function () {
                            fs.unlink(path, (err => {
                                if (err) {
                                    console.log(err);
                                    throw "Failed to delete temp file"
                                }
                            }));
                        });
                    const updateData = {
                        product_name,
                        product_desc,
                        product_price,
                        product_category,
                        product_image: `/images/${file_name}`,
                        updated_at: new Date()
                    }
                    await productModel.update(updateData, {
                        where: {
                            id
                        }
                    });
                    fs.unlink(`./public${findData.product_image}`, (err => {
                        if (err) {
                            console.log("Failed to delete Old File");
                        }
                    }));
                    res.status(200).json({
                        status: 200,
                        message: "Data berhasil di update",
                        data: updateData
                    });
                } else {
                    const updateData = {
                        product_name,
                        product_desc,
                        product_price,
                        product_category,
                        updated_at: new Date()
                    }
                    await productModel.update(updateData, {
                        where: {
                            id
                        }
                    });
                    res.status(200).json({
                        status: 200,
                        message: "Data berhasil di update",
                        data: updateData
                    });
                }
            });
        }
    } catch (e) {
        res.status(500).json({
            status: 500,
            err: e
        });
    }
}

exports.delete_product = async function (req, res) {
    const { id } = req.query;
    try {
        const isFound = await productModel.findOne({
            where: {
                id
            }
        });
        if (isFound == null) {
            throw "Item tidak ditemukan"
        } else {
            await productModel.destroy({
                where: {
                    id
                }
            });
            console.log("Data deleted at row " + id);
            fs.unlink(`./public${isFound.product_image}`, (err => {
                if (err) {
                    console.log("Failed to delete local File");
                }
            }))
            res.status(200).json({
                status: 200,
                message: `Data deleted at row ${id}`
            })
        }
    } catch (e) {
        res.status(500).json({
            status: 500,
            err: e
        });
    }
}

exports.getCategory = async (req, res) => {
    try {
        const data = await categoryModel.findAll();
        res.status(200).json({
            status: 200,
            data
        })
    } catch (e) {
        console.log("err category", e);
        res.status(500).json({
            status: 500,
            err: e
        })
    }
}

