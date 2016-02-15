'use strict';

export default {
  databaseUri: 'mongodb://localhost:27017/kpm',
  logFormat: 'combined', // @see https://github.com/expressjs/morgan#predefined-formats
  s3: { bucket: '', profile: 'default' },
  storageUrl: 'https://www.example.com'
};
