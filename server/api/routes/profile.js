const { Router } = require("express");
const { defu } = require("defu");
const { Profile, sequelize } = require("../../../db/models");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Gets all profile
 *     tags: [Profile]
 *     produces: [application/json]
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", async (req, res, next) => {
  try {
    const response = await getProfile();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      error: true,
      messages: error.toString()
    });
  }
});


/**
 * @swagger
 * /api/profile/{id}:
 *   get:
 *     summary: Gets one profile by id
 *     tags: [Profile]
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
    const response = await getProfile(_id);
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
 * /api/profile/create:
 *   post:
 *     summary: Adds a profiles
 *     tags: [Profile]
 *     produces: [application/json]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: # request body
 *             type: object
 *             properties:
 *               wantedJobTitle:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               postalCode:
 *                 type: integer
 *               drivingLicense:
 *                 type: string
 *               nationality:
 *                 type: string
 *               placeOfBirth:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *             example:
 *               wantedJobTitle: Designer
 *               firstName: John
 *               lastName: Doe
 *               email: johndoe@gmail.com
 *               phone: "08888888"
 *               country: DKI Jakarta
 *               city: Jakarta Selatan
 *               address: Jl. Damai Raya, RT.1/RW.1, Pd. Labu, Kec. Cilandak
 *               postalCode: 12450
 *               drivingLicense: "123456789"
 *               nationality: Indonesia
 *               placeOfBirth: Surabaya
 *               dateOfBirth: 12-04-1945
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/create", async (req, res, next) => {
  try {
    const _body = req.body;
    let response = await createProfile(_body);

    if (response && response.id) {
      response = await getProfile(response.id);
    }

    res.status(200).json(response)
  } catch (error) {
    console.log("*** /api/create/profile, error: ", error)
    res.status(500).json({
      error: true,
      messages: error.toString()
    });
  }
});

/**
 * @swagger
 * /api/profile/update/{id}:
 *   post:
 *     summary: Updates on profile
 *     tags: [Profile]
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
 *               wantedJobTitle:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               postalCode:
 *                 type: integer
 *               drivingLicense:
 *                 type: string
 *               nationality:
 *                 type: string
 *               placeOfBirth:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *             example:
 *               wantedJobTitle: Designer
 *               firstName: John
 *               lastName: Doe
 *               email: johndoe@gmail.com
 *               phone: "08888888"
 *               country: DKI Jakarta
 *               city: Jakarta Selatan
 *               address: Jl. Damai Raya, RT.1/RW.1, Pd. Labu, Kec. Cilandak
 *               postalCode: 12450
 *               drivingLicense: "123456789"
 *               nationality: Indonesia
 *               placeOfBirth: Surabaya
 *               dateOfBirth: 12-04-1945
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/update/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const _body = req.body;

    const [ressProfileUpdate] = await updateProfile(_id, _body);

    if (!ressProfileUpdate) {
      throw new Error(`Update profile failed. Sequelize: ${[ressProfileUpdate]}`);
    }

    const response = await getProfile(_id, [["id", "profileCode"]]);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({
      error: true,
      messages: error.toString()
    });
  }
});


/** dao profile */

async function getProfile (
  id=null,
  attributes = [
    ["id", "profileCode"],
    "wantedJobTitle",
    "firstName",
    "lastName",
    "email",
    "phone",
    "country",
    "city",
    "address",
    "postalCode",
    "drivingLicense",
    "nationality",
    "placeOfBirth",
    "dateOfBirth",
    "photoUrl"
  ]
) {
  try {
    if (id) {
      const _optionParams = defu({ where: { id } }, { attributes });
      const response = await Profile.findOne(_optionParams);
      return response;
    }

    const response = await Profile.findAll({ attributes });
    return response;
  } catch (error) {
    throw error;
  }
}

async function createProfile (data) {
  const transaction = await sequelize.transaction();
  const _options = { transaction };

  try {
    const response = await Profile.create(data, _options);
    await transaction.commit();
    return response;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function updateProfile (id, data) {
  const transaction = await sequelize.transaction();
  const _options = defu({ where: { id } }, { transaction });

  try {
    const response = await Profile.update(data, _options);
    await transaction.commit();
    return response;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports.getProfile = getProfile
module.exports.createProfile = createProfile
module.exports.updateProfile = updateProfile
module.exports.default = router
