const multer = require('multer');
const {v4: uuidv4} = require('uuid');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, "./images");
	},
	filename: (req, file, cb) => {
		const ext = file.originalname.split('.').pop();
		const uuid = uuidv4();
	  cb(null, file.fieldname + '-' + uuid + '.' + ext);
	}
  });
  
const upload = multer({storage: storage});

module.exports = upload;