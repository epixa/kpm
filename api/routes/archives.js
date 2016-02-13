'use strict';

import { S3 } from 'aws-sdk';

export function *get() {
  try {
    this.attachment('marvel-1.0.0.tgz');
    const response = yield retrieveFromS3(stream => this.body = stream);
    this.status = response.statusCode;
  } catch (err) {
    console.error(err);
    this.throw(500, err);
  }
}

export function *upload() {
  try {
    const response = yield uploadToS3(this.req);
    this.status = 204;
  } catch (err) {
    console.error(err);
    this.throw(500, err);
  }
}

function retrieveFromS3(fn) {
  return function (done) {
    const s3obj = new S3({ profile: 'kpmpkgs', params: { Bucket: 'kpmpkgs' } });
    const stream = s3obj.getObject({ Key: 'marvel/marvel-1.0.0.tgz' })
      .on('httpDone', res => done(null, res.httpResponse))
      .createReadStream();
    fn(stream);
  };
}

function uploadToS3(stream) {
  return function (done) {
    const s3obj = new S3({ profile: 'kpmpkgs', params: { Bucket: 'kpmpkgs' } });
    s3obj.upload({ Body: stream, Key: 'marvel/marvel-1.0.0.tgz' })
      .on('httpUploadProgress', evt => console.log('progress:', evt))
      .send(done);
  };
}
