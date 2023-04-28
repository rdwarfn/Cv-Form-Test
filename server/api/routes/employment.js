const { Router } = require("express");
const { defu } = require("defu");
const { getProfile } = require("./profile")
const { Employment, Profile, sequelize } = require("../../../db/models");
const { mdOptions } = require("../../../utils/utils");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Employment
 */

/**
 * @swagger
 * /api/employment/{id}:
 *   get:
 *     summary: Gets all employment
 *     tags: [Employment]
 *     produces: [application/json]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *     200:
 *       description: OK
 */
router.get("/:id", async (req, res, next) => {
  try {
    const _profileCode = req.params.id;
    const response = await getEmployment(_profileCode);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(200).json({
      error: true,
      message: error.toString()
    });
  }
});


/**
 * @swagger
 * /api/employment/create/{id}:
 *   post:
 *     summary: Adds a employment
 *     tags: [Employment]
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
 *             jobTitle:
 *               type: string
 *             employer:
 *               type: string
 *             startDate:
 *               type: string
 *             endDate:
 *               type: string
 *             city:
 *               type: string
 *             description:
 *               type: string
 *           example:
 *             jobTitle: CEO
 *             employer: Toko Lapak
 *             startDate: 01-01-2020
 *             endDate: 01-01-2021
 *             city: Jakarta
 *             description: CEO
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/create/:id", async (req, res, next) => {
  try {
    const _profileCode = req.params.id;
    const _body = req.body;
    const response = await createEmployment(_profileCode, _body);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({
      error: true,
      messages: error.toString()
    });
  }
});

/**
 * @swagger
 * /api/employment/delete/{id}:
 *   post:
 *     summary: Deletes a employment of profile by profileCode and employmentID
 *     tags: [Employment]
 *     produces: [Employment]
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
 *           first:
 *             value: 1
 *             summary: Example employId first value
 *           second:
 *             value: 2
 *             summary: Example employId second value
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/delete/:id", async (req, res, next) => {
  try {
    const _profileCode = req.params.id;
    const _query = req.query;

    const response = await deleteEmployment(_profileCode, _query.id);
    res.status(200).json({ profileCode: response });
  } catch (error) {
    res.status(200).json({
      error: true,
      messages: error.toString()
    });
  }
});

// dao employment

async function getEmployment (profileCode) {
  const attributes = [
    "id",
    "jobTitle",
    "employer",
    "startDate",
    "endDate",
    "city",
    "description"
  ];
  const _options = defu({ where: { profileCode  } }, { attributes })

  try {
    const ressProfile = await getProfile(profileCode, [["id", "profileCode"]]);

    if (!ressProfile) {
      throw new Error(`Profile with id ${profileCode} not found`);
    };

    const response = await Employment.findAll(_options, mdOptions);
    return response;
  } catch (error) {
    throw error;
  }
}

async function createEmployment (profileId, data) {
  const transaction = await sequelize.transaction();

  try {
    const ressProfile = await getProfile(profileId, [["id", "profileCode"]]);

    if (!ressProfile) {
      throw new Error(`Profile with id ${profileId} not found`);
    }

    if (Array.isArray(data)) {
      let _payload = [];

      for (let item of data) {
        _payload.push(defu(item, ressProfile));
      }

      const response = await Employment.bulkCreate(_payload, { transaction })
      await transaction.commit();
      return response;
    }

    const _payload = defu(data, ressProfile);
    const response = await Employment.create(_payload, { transaction });

    await transaction.commit();
    return response;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function deleteEmployment (profileId, employmentId) {
  const transaction = await sequelize.transaction();

  try {
    if (!employmentId) throw new Error(`Queryparam id not found`);

    const ressProfile = await getProfile(profileId, [["id", "profileCode"]]);

    if (!ressProfile) throw new Error(`Profile with id ${profileId} not found`);

    const ressDestroy = await Employment.destroy({
      where: { id: employmentId, profileCode: ressProfile.profileCode }
    }, { transaction });

    if (!ressDestroy) {
      throw new Error("Delete employment failed")
    }

    await transaction.commit();
    return ressProfile.profileCode
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports.getEmployment = getEmployment;
module.exports.createEmployment = createEmployment;
module.exports.deleteEmployment = deleteEmployment;
module.exports.default = router;
