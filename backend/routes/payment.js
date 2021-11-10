const { processPayment } = require("../controllers/payment");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/process").post(isAuthenticatedUser, processPayment);

module.exports = router;