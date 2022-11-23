import { Router } from "express";
import multer from "multer";
import path from "path";
import methodOverride from "method-override";
import { 
	readAll, 
	create,
	readById,
	updateById,
	deleteById
} from "../controllers/auto.controller.js"
const router = Router();
const __dirname = path.resolve();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     req.body.id = news.length ? news.length : 1;

//     const destination = path.join(__dirname, "views", (req.body.id + 1).toString());
//     if (!fs.existsSync(destination)) {
//       fs.mkdirSync(destination);
//     }
//     cb(null, destination);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

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
	.get(readAll, (req, res) => {
		res.render("showcase", {
			title: 'auto-showcase',
			autos: req.autos,
			username: req.session.username
		});
	})
	.post(create, readAll, (req, res) => {
		res.render("showcase", {
			title: 'auto',
			autos: req.autos,
			username: req.session.username
		});
	});

router.route('/:id')
	.get(readById, (req, res) => res.send(req.auto))
	.put(updateById, (req, res) => res.send('Auto successfully updated'))
	.delete(deleteById, (req, res) => res.send('Auto successfully removed'));

export default router;