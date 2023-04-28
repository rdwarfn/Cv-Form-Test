const { Router } = require("express");
const swaggerUi = require("swagger-ui-express");
const { useSwagger } = require("../../utils/utils");

const profile = require("./routes/profile");
const photo = require("./routes/photo");
const employment = require("./routes/employment");
const education = require("./routes/education");
const skill = require("./routes/skill");

const router = Router();
const { swaggerOption, swaggerSpec } = useSwagger();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOption));
router.use("/profile", profile.default);
router.use("/employment", employment.default);
router.use("/photo", photo);
router.use("/education", education.default);
router.use("/skill", skill.default);

module.exports = router;
