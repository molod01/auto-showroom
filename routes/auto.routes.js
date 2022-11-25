import path from "path";
import multer from "multer";
import methodOverride from "method-override";
import filter from "../middleware/filter.js";
import verifyToken from "../middleware/auth.js"
import prepareUpdates from "../middleware/updates.js";
import { Router } from "express";
import { 
	readAll, 
	create,
	readById,
	updateById,
	deleteById
} from "../controllers/auto.controller.js"

const router = Router();
const __dirname = path.resolve();

router.use(methodOverride("X-HTTP-Method"));
router.use(methodOverride("X-HTTP-Method-Override"));
router.use(methodOverride("X-Method-Override"));
router.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      const method = req.body._method;
      delete req.body._method;

      return method;
    }
  })
);
router.route('/')
	.get(readAll, filter, (req, res) => {
		res.render("showcase", {
			autos: req.autos,
			login: req.session.login,
		});
	})
	.post(verifyToken, create, (req, res) => {
		res.redirect('/');
	});

router.route('/:id')
	.get(readById, (req, res) => 
		res.render("auto", {
			auto: req.auto,
			login: req.session.login
		})
	)
	.put(verifyToken, prepareUpdates, updateById, (req, res) => {
		res.redirect('/' + req.params.id)})
	.delete(verifyToken, deleteById, (req, res) => res.redirect('/'));

export default router;