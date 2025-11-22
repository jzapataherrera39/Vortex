import multer from 'multer';
import { Request } from 'express';

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const isImageField = file.fieldname.startsWith('foto') || file.fieldname.includes('[foto]');
  const isPdfField = file.fieldname === 'hojaSeguridad' || file.fieldname === 'fichaTecnica';

  if (isImageField) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no válido para imagen, solo se permite JPEG o PNG.'));
    }
  } else if (isPdfField) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no válido, solo se permite PDF.'));
    }
  } else {
       cb(new Error(`Campo de archivo inesperado: ${file.fieldname}`));
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB file size limit
});

export default upload;
