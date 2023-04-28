const { Router } = require("express");
const fs = require("fs");
const { getProfile, updateProfile } = require("./profile");
const { genFilename, mdOptions, formatReplaceBase64img } = require("../../../utils/utils");
const { useUpload } = require("../../../utils/utils");
const { multerObj, uploadPath } = useUpload();

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Photo
 */

/**
 * @swagger
 * /api/photo/create/{id}:
 *   post:
 *     summary: Adds / uploads a photo
 *     tags: [Photo]
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
 *               base64img:
 *                 type: string
 *             example:
 *               base64img: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=
 *     responses:
 *       200:
 *         description: OK
 */
router.post("/create/:id", multerObj.single(), async function (req, res, next) {
  console.log("*** uploadPath", uploadPath)
  try {
    const _id = req.params.id;
    let { base64img } = req.body;

    if (!base64img) throw new Error("Payload base64img not found");

    base64img = formatReplaceBase64img(base64img);

    const _fname = genFilename() + '.png';
    const ressUser = await getProfile(_id);

    if (!ressUser) {
      res.status(404).json({
        error: true,
        messages: "User not found"
      });
      return
    }

    fs.writeFile(`${uploadPath}/${_fname}`, base64img, "base64", (err) => {
        if (err) throw new Error(err);
    });

    const [ressUpdate] = await updateProfile(_id, {
      photoUrl: `/static/uploads/${_fname}`
    });

    if (ressUpdate) {
      const response = await getProfile(_id, [["id", "profileCode"], "photoUrl"]);
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      messages: error.toString()
    });
  }
});


/**
 * @swagger
 * /api/photo/{id}:
 *   get:
 *     summary: Gets one photo by id
 *     tags: [Photo]
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
router.get("/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;

    const response = await getProfile(_id, ["photoUrl"]);

    if (!response || !response.photoUrl) {
      res.status(400).send("Profile not found or photoUrl invalid")
    }

    fs.readFile(
      __dirname + "/../.." + response.photoUrl,
      (err, data) => {
        if (err) throw err;
        res.send(data.toString("base64"));
      }
    )
  } catch (error) {
    res.send(error.toString())
  }
});


/**
 * @swagger
 * /api/photo/delete/{id}:
 *   post:
 *     summary: Deletes one photo by id
 *     tags: [Photo]
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
router.post("/delete/:id", async function (req, res, next) {
  try {
    const _id = req.params.id;
    const ressGet = await getProfile(_id, [["id", "profileCode"], "photoUrl"]);

    if (!ressGet || !ressGet.photoUrl) {
      throw new Error("Profile not found or photoUrl invalid");
    }

    fs.unlink(__dirname + "/../.." + ressGet.photoUrl, async (err) => {
      if (err) throw err;
      await updateProfile(_id, { photoUrl: null });
      res.status(200).json({ profileCode: ressGet.profileCode });
    })
  } catch (error) {
    res.status(500).json({
      error: true,
      messages: error.toString()
    });
  }
})

module.exports = router;
