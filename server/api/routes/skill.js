const { Router } = require("express");
const { sequelize, Skill } = require("../../../db/models");
const { getProfile } = require("./profile");
const { defu } = require("defu");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Skill
 */

/**
 * @swagger
 * /api/skill:
 *   get:
 *     summary: Gets all skill
 *     tags: [Skill]
 *     produces: [Skill]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", async (req, res, next) => {
  try {
    const response = await getSkill();
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
 * /api/skill/{id}:
 *   get:
 *     summary: Gets all skill by profileCode
 *     tags: [Skill]
 *     produces: [Skill]
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
    const response = await getSkill(_id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(200).json({
      error: true,
      messages: error.toString()
    });
  }
});


/**
 * @swagger
 * /api/skill/create/{id}:
 *   post:
 *     summary: Adds a skill profile
 *     tags: [Skill]
 *     produces: [Skill]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       schema:
 *         type: object
 *         properties:
 *           skill:
 *             type: string
 *           level:
 *             type: string
 *         example:
 *           skill: Docker
 *           level: Expert
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/create/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const _body = req.body;

    const response = await createSkill(_id, _body);
    res.status(200).json(response)
  } catch (error) {
    res.status(200).json({
      error: true,
      messages: error.toString()
    });
  }
});

/**
 * @swagger
 * /api/skill/delete/{id}:
 *   post:
 *     summary: Deletes a skill by profileCode and skillID
 *     tags: [Skill]
 *     produces: [Skill]
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
 *             summary: Example skillID first value
 *           second:
 *             value: 2
 *             summary: Example skillID second value
 *     repsonses:
 *       200:
 *         description: OK
 */
router.post("/delete/:id", async (req, res, next) => {
  try {
    const _profileCode = req.params.id;
    const _id  = req.query.id;
    const response = await deleteSkill(_profileCode, _id);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({
      error: true,
      messages: error.toString()
    });
  }
});

// dao skills
async function getSkill (profileCode=null) {
  const _options = { attributes: ["id", "skill", "level"] };
  const _options2 = defu({ where: { profileCode } }, _options);

  try {
    if (profileCode) {
      const ressProfile = await getProfile(profileCode, [["id", "profileCode"]]);
      console.log("*** ressProfile", ressProfile);
      const response = await Skill.findAll(_options2);
      return response;
    }

    const response = await Skill.findAll(_options);
    return response;
  } catch (error) {
    throw error;
  }
};

async function createSkill (profileCode, data) {
  const transaction = await sequelize.transaction();

  try {
    const ressProfile = await getProfile(profileCode, [["id", "profileCode"]]);

    if (!ressProfile) {
      throw new Error(`Profile with id ${id} not found`);
    }

    if (Array.isArray(data)) {
      let _payload = [];

      for (let item of data) {
        _payload.push(defu(item, ressProfile));
      }

      const response = await Skill.bulkCreate(_payload, { transaction });
      await transaction.commit();
      return response;
    }

    const _payload = defu(data, ressProfile);
    const response = await Skill.create(_payload, { transaction });
    await transaction.commit();
    return response;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

async function deleteSkill (profileCode, id) {
  const transaction = await sequelize.transaction();

  try {
    if (!id) throw new Error(`Queryparam id not found`);

    const ressProfile = await getProfile(profileCode, [["id", "profileCode"]]);

    if (!ressProfile) throw new Error(`Profile with id ${profileCode} not found`);

    const ressDestroy = await Skill.destroy({
      where: { id, profileCode },
      transaction
    });

    if (!ressDestroy) throw new Error("Delete skill failed");

    await transaction.commit();
    return { profileCode };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports.deleteSkill = deleteSkill;
module.exports.getSkill = getSkill;
module.exports.createSkill = createSkill;
module.exports.default = router;
