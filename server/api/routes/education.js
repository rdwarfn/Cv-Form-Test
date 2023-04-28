const { Router } = require("express");
const { defu } = require("defu");
const { sequelize, Education } = require("../../../db/models");
const { getProfile } = require("./profile");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Education
 */

/**
 * @swagger
 * /api/education/{id}:
 *   get:
 *     summary: Gets list education by profileCode
 *     tags: [Education]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const response = await getEducation(_id);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({
      error: true,
      errors: error.toString()
    });
  }
});


/**
 * @swagger
 * /api/education/create/{id}:
 *   post:
 *     summary: Adds education of profile by profileCode
 *     tags: [Education]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobTitle:
 *                 type: string
 *               employer:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               city:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               jobTitle: CEO
 *               employer: Toko Lapak
 *               startDate: 01-01-2020
 *               endDate: 01-01-2021
 *               city: Jakarta
 *               description: CEO
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/create/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const _body = req.body;
    const { id, profileCode } = await createEducation(_id, _body);
    res.status(200).json({ profileCode, id });
  } catch (error) {
    res.status(200).json({
      error: true,
      messages: error.toString()
    });
  }
});


/**
 * @swagger
 * /api/education/delete/{id}:
 *   post:
 *     summary: Deletes one education of profile by profileCode & id education
 *     tags: [Education]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         examples:
 *          first:
 *            value: 1
 *            summary: Example eduId first value
 *          second:
 *            value: 2
 *            summary: Example eduId second value
 *     responses:
 *       200:
 *        description: OK
 */
router.post("/delete/:id", async (req, res, next) => {
  try {
    const _profileCode = req.params.id;
    const _id = req.query.id;

    const response = await deleteEducation(_profileCode, _id);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({
      erorr: true,
      messages: error.toString()
    });
  }
});

// dao education
async function getEducation (profileCode, id=null) {
  try {
    const ressProfile = await getProfile(profileCode, [["id", "profileCode"]]);

    if (!ressProfile) {
      throw new Error(`Profile with id ${profileCode} not found`)
    }

    if (!id) {
      const response = await Education.findAll({ where: { profileCode } });
      return response;
    }

    const response = await Education.findOne({ where: { profileCode, id } });
    return response;
  } catch (error) {
    throw error;
  }
}

async function createEducation (profileCode, data) {
  const transaction = await sequelize.transaction();
  const attributes = ["id", "profileCode"];
  try {
    const ressProfile = await getProfile(profileCode, [["id", "profileCode"]]);

    if (!ressProfile) {
      throw new Error(`Profile with id ${profileCode} not found`)
    }

    if (Array.isArray(data)) {
      const _payload = data.map(item => defu(item, ressProfile));
      const response = await Education.bulkCreate(_payload, { transaction, attributes });
      console.log("*** createEducation -> response: ", response)
      await transaction.commit();
      return response;
    }

    const _data = defu(data, ressProfile);
    const response = await Education.create(_data, { transaction, attributes });
    await transaction.commit();
    return response;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function deleteEducation (profileCode, id) {
  const transaction = await sequelize.transaction();
  try {
    const ressEducation = await getEducation(profileCode, id);

    if (!ressEducation) {
      throw new Error(`Education with id ${id} and profileCode ${profileCode} not found`);
    }

    const response = await Education.destroy({
      where: { id }
    }, { transaction });

    if (!response) {
      throw new Error(`Delete education with id ${id} failed`);
    }

    await transaction.commit();
    return { profileCode: ressEducation.profileCode };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports.getEducation = getEducation;
module.exports.createEducation = createEducation;
module.exports.deleteEducation = deleteEducation;
module.exports.default = router;
