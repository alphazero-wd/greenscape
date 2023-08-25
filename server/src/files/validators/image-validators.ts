import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { MAX_IMAGE_SIZE } from '../../common/constants';

export const imageValidators = [
  new MaxFileSizeValidator({ maxSize: MAX_IMAGE_SIZE }),
  new FileTypeValidator({ fileType: /^image\/(jpeg|png|jpg)$/ }),
];
